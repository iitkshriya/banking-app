self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('img-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/add.svg',
        // '/box.svg',
        '/collapse.svg',
        // '/creditIcon.svg',
        // '/deactivateCard.svg',
        // '/details.svg',
        '/expand.svg',
        // '/flights.svg',
        // '/freeze.svg',
        // '/gPayIcon.svg',
        // '/greenCard.svg',
        '/greenLogo.svg',
        '/greenLogoIcon.svg',
        // '/homeIcon.svg',
        // '/horn.svg',
        '/next.svg',
        // '/paymentsIcon.svg',
        // '/replaceCard.svg',
        '/showEye.svg',
        '/smallCard.svg',
        // '/spendLimit.svg',
        // '/transactions.svg',
        // '/user.svg',
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
