/* Beatbox Tools service worker: network first, so an update always wins; the cache is only the offline fallback. */
var CACHE = 'beatbox-v1';
/* Everything the app uses, saved on install so every tool also opens offline the first time. Missing files are skipped. */
var FILES = ['./', 'index.html', 'voice.html', 'history.html', 'routine.html', 'settings.html', 'privacy.html', 'metronome.html', 'battle.html', 'log.html', 'loop.html', 'pattern.html', 'timing.html', 'ladder.html', 'tuner.html', 'spectrum.html', 'prompts.html',
  'theme.css', 'themes.css', 'tools.css', 'legacy.css', 'fonts.css', 'theme.js', 'tools.js', 'plog.js', 'confirm.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'favicon.svg'];
self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(FILES.map(function (f) { return c.add(new Request(f, { cache: 'reload' })).catch(function () {}); }));
  }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r).then(function (res) {
      if (res && res.ok && res.status === 200) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(r, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(r, { ignoreSearch: true }).then(function (m) {
        return m || (r.mode === 'navigate' ? caches.match('index.html', { ignoreSearch: true }) : Response.error());
      });
    })
  );
});
