const CACHE_NAME = 'regyster-v2.5';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activación y limpieza de caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia de cache: Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, la guardamos en cache
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intentamos desde cache
        return caches.match(event.request);
      })
  );
});

// Background Sync para guardar datos cuando vuelva la conexión
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-registros') {
    event.waitUntil(
      // Aquí podrías sincronizar datos con un servidor
      Promise.resolve()
    );
  }
});

// Notificaciones push (preparado para futuro uso)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'Tienes una notificación de Regyster',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/'
      }
    };
    event.waitUntil(
      self.registration.showNotification(data.title || 'Regyster', options)
    );
  }
});

// Manejar click en notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

