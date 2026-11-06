const CACHE_NAME = 'donea-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './admin-panel.html',
  './owner-dashboard.html',
  './icon.png',
  './1000065786.png'
];

// تثبيت ملفات التطبيق في ذاكرة الهاتف
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// استدعاء الملفات من الذاكرة لسرعة الفتح
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
