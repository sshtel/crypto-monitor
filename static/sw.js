importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/18c484624601c2ce4e57.js",
    "revision": "6ddfc33ce96479771b44cf662651da40"
  },
  {
    "url": "/_nuxt/2de383476ef309b8bc15.js",
    "revision": "22a3edf7ccd68f4582ee3f7f65046ca6"
  },
  {
    "url": "/_nuxt/53e968a22893a1bb890e.js",
    "revision": "3b63b8201c24511bd850851562aaeeca"
  },
  {
    "url": "/_nuxt/9a6eff88f4f91ba892d8.js",
    "revision": "7335e57df70b5728b4d45c947d101692"
  },
  {
    "url": "/_nuxt/9eccb9ac0a9f7aaa5f2f.js",
    "revision": "b2d202032ec7ee56bb688d7223c93d66"
  },
  {
    "url": "/_nuxt/b5344444684e2af3d0db.js",
    "revision": "2e342a719bb30af20af4f3fd11d7e75a"
  }
], {
  "cacheId": "nuxt",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
