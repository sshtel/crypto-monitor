const express = require('express')
const app = express()

const staticPath = __dirname + '/../src/public';
app.use('/', express.static(staticPath));

// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
