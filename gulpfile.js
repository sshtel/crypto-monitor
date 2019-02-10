'use strict';

var gulp = require('gulp');
var tslint = require('gulp-tslint');
var jasmine = require('gulp-jasmine');
var del = require('del');

var sources = ['./src/**/*.ts'];

function compileTypescript(done) {
  require('child_process').exec('tsc -p ' + process.cwd(), function (err, stdout, stderr) {
    var outString = stdout.toString();
    if (outString) console.log('\n', outString);
    done(err);
  });
}

function watch() {
  gulp.watch([sources], {interval: 2000}, ['kill']);
}

function clean(done) {
  del(['./dist', './node_modules'], done);
}

var app;
function start() {
  return launchApp(['dist/app.js']);
}

function debug() {
  return launchApp(['--debug', 'dist/app.js']);
}

function launchApp(params, exitWithCode) {
  var spawn = require('child_process').spawn;
  app = spawn('node', params);
  app.stdout.on('data', function (data) {
    process.stdout.write(data.toString());
  });
  app.stderr.on('data', function (data) {
    process.stderr.write(data.toString());
  });
  app.on('close', function (code) {
    console.log('child process exited with code', code);
    process.exit(exitWithCode && code || 0);
  });
}

function kill() {
  if (app) {
    app.kill('SIGTERM');
  }
  setTimeout(function () {
    process.exit();
  }, 500);
}

function local() {
  compileTypescript(function (err) {
    if (err) {
      console.error('\tfailed to compile. waiting for fix...');
      return;
    }
    debug();
  });
}

function jasmineWatchTask(name) {
  var buildAndTest = 'run-' + name;
  gulp.task(name, [buildAndTest], function () {
    gulp.watch(sources, [buildAndTest]);
  });
  gulp.task(buildAndTest, ['build'], function () {
    gulp.src('./dist/spec/' + name + '.js')
      .pipe(jasmine());
  });
}

function lint() {
  if (process.env.npm_lifecycle_event === 'test') return;
  return gulp.src('src/**/*.ts')
      .pipe(tslint({
          formatter: 'stylish'
      }))
      .pipe(tslint.report({
          summarizeFailureOutput: true
      }));
}

gulp.task('clean', clean);
gulp.task('build', ['tslint'], compileTypescript);
gulp.task('watch', watch);
gulp.task('kill', kill);
gulp.task('start', start);
gulp.task('debug', debug);
gulp.task('local', ['watch'], local);
gulp.task('tslint', lint);

(function registerJasmineTasks() {
  var files = require('glob').sync('./dist/spec/*.js');
  files.forEach(function (name) {
    var taskName = name.match(/^.*\/(.*)\.js$/)[1];
    jasmineWatchTask(taskName);
  });
})();
