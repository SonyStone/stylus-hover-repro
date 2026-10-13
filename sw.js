// Minimal service worker so Chrome offers to install the page as an app.
self.addEventListener('fetch', e => e.respondWith(fetch(e.request)));
