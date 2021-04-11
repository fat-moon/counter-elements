importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js',
)

workbox.precaching.precacheAndRoute([
  { revision: 'd0783d9292c92c83e52884def1c91409', url: 'css/styles.css' },
  { revision: '2b2e05539e3f05d37acfb7e0ac13b1bd', url: 'fonts/icomoon.eot' },
  { revision: '1aa6ceb3d7b56854008068d33bf59246', url: 'fonts/icomoon.svg' },
  { revision: '993b9fea9740ab1959e6238dfac44d92', url: 'fonts/icomoon.ttf' },
  { revision: 'dd6ca384a4d3ffdb876dd7b321a987d8', url: 'fonts/icomoon.woff' },
  {
    revision: '2f354053d1c9c36f533ebd226698bfa5',
    url: 'fonts/Montserrat-Light.ttf',
  },
  {
    revision: '831ba5a0dcfcf7c4658165faac1c108a',
    url: 'images/background.jpg',
  },
  {
    revision: 'd0039c4180e9095a986c03b9a333db63',
    url: 'images/touch/ce-144.png',
  },
  {
    revision: '7592de00057b1a5ec9fb1f3b4f24af94',
    url: 'images/touch/ce-192.png',
  },
  {
    revision: '1048d2d1b2d6b5cefdef8ea5e5e4ffc3',
    url: 'images/touch/ce-48.png',
  },
  {
    revision: 'da1f4ae7a3ad96a5cdfed2e4cb4ddee7',
    url: 'images/touch/ce-512.png',
  },
  {
    revision: 'c8d243c2b4bac012aa31a532076c2f22',
    url: 'images/touch/ce-72.png',
  },
  {
    revision: 'af02f5e58751ca14f121e107d2b28cd2',
    url: 'images/touch/ce-96.png',
  },
  { revision: '1374d3f8c1bed786d697a89877d1ecaa', url: 'index.html' },
  { revision: '897230180100fe8d6f09c4ed91d73cb2', url: 'js/index.js' },
  { revision: '0aa4f24004cb0d043e560d8335464754', url: 'manifest.json' },
])
