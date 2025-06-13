self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('img-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/add.svg',
        '/collapse.svg',
        '/expand.svg',
        '/greenLogo.svg',
        '/next.svg',
        '/showEye.svg',
        '/smallCard.svg',
        '/visa.svg',
        '/whiteLogoLarge.svg',
      ])
    }),
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.url.match(/\.(?:png|jpg|jpeg|svg|gif|webp)$/)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((response) => {
            return caches.open('img-cache').then((cache) => {
              cache.put(event.request, response.clone())
              return response
            })
          })
        )
      }),
    )
  }
})
