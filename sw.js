importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");

workbox.precaching.precacheAndRoute([
  {
    "url": "css/style.css",
    "revision": "8e0668d7fd6cf0f230c3592c31c1099e"
  },
  {
    "url": "css/style.min.css",
    "revision": "aa0bb83c5485f51ea6286466bc0ba767"
  },
  {
    "url": "fonts/icomoon.eot",
    "revision": "2b2e05539e3f05d37acfb7e0ac13b1bd"
  },
  {
    "url": "fonts/icomoon.svg",
    "revision": "c56f0a61a9d231330cfa3e7bae976392"
  },
  {
    "url": "fonts/icomoon.ttf",
    "revision": "993b9fea9740ab1959e6238dfac44d92"
  },
  {
    "url": "fonts/icomoon.woff",
    "revision": "dd6ca384a4d3ffdb876dd7b321a987d8"
  },
  {
    "url": "fonts/Montserrat-Light.ttf",
    "revision": "2f354053d1c9c36f533ebd226698bfa5"
  },
  {
    "url": "gulpfile.js",
    "revision": "ee1c994b3eede1b9cf255ea7f8cacd54"
  },
  {
    "url": "images/background.jpg",
    "revision": "831ba5a0dcfcf7c4658165faac1c108a"
  },
  {
    "url": "images/screenshot.png",
    "revision": "79edf76afea8ea8fde29dc3a233fda0a"
  },
  {
    "url": "images/touch/ce-144.png",
    "revision": "d0039c4180e9095a986c03b9a333db63"
  },
  {
    "url": "images/touch/ce-192.png",
    "revision": "7592de00057b1a5ec9fb1f3b4f24af94"
  },
  {
    "url": "images/touch/ce-48.png",
    "revision": "1048d2d1b2d6b5cefdef8ea5e5e4ffc3"
  },
  {
    "url": "images/touch/ce-512.png",
    "revision": "da1f4ae7a3ad96a5cdfed2e4cb4ddee7"
  },
  {
    "url": "images/touch/ce-72.png",
    "revision": "c8d243c2b4bac012aa31a532076c2f22"
  },
  {
    "url": "images/touch/ce-96.png",
    "revision": "af02f5e58751ca14f121e107d2b28cd2"
  },
  {
    "url": "index.html",
    "revision": "8aa09b957d215a418d76b8166ebc18e2"
  },
  {
    "url": "js/index.js",
    "revision": "fb47cf226f8886880c9c137b65f7f728"
  },
  {
    "url": "manifest.json",
    "revision": "9e5e054ddee37dd5e96ae2e137a5653e"
  },
  {
    "url": "package.json",
    "revision": "fa938413e4cedbc5aa306d3e76b4e543"
  },
  {
    "url": "README.md",
    "revision": "05d1f694f3ea4fdf72d9a2b06bb0322b"
  },
  {
    "url": "resources/logo.svg",
    "revision": "2b83b8e62dfbc7da6c3a051e97b9c04e"
  },
  {
    "url": "scss/style.scss",
    "revision": "606fc3191fe9b505cf84c1c78cdebf9b"
  },
  {
    "url": "src-sw.js",
    "revision": "51a3a4089e09c665ea85b5b4dc99c34f"
  },
  {
    "url": "workbox-config.js",
    "revision": "b6cede83d92bddb04399dc9c34dc0c1a"
  }
]);