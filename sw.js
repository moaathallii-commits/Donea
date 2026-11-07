const CACHE_NAME = 'donea-app-v2';

// التثبيت الفوري وتجاوز النسخة العالقة
self.addEventListener('install', event => {
  self.skipWaiting();
});

// مسح جميع الكاشات القديمة فوراً
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    )).then(() => self.clients.claim())
  );
});

// جلب أحدث كود من الإنترنت دائماً، واستخدام الذاكرة فقط عند انقطاع الشبكة
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
