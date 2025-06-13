self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('img-cache').then((cache) => {
      return cache.addAll([
        './src/assets/add.svg',
        './src/assets/box.svg',
        './src/assets/collapse.svg',
        './src/assets/creditIcon.svg',
        './srcassets/deactivateCard.svg',
        './src/assets/details.svg',
        './src/assets/expand.svg',
        './src/assets/flights.svg',
        './src/assets/freeze.svg',
        './src/assets/gPayIcon.svg',
        './src/assets/greenCard.svg',
        './src/assets/greenLogo.svg',
        './src/assets/greenLogoIcon.svg',
        './src/assets/homeIcon.svg',
        './src/assets/horn.svg',
        './src/assets/next.svg',
        './src/assets/paymentsIcon.svg',
        './src/assets/replaceCard.svg',
        './src/assets/showEye.svg',
        './src/assets/smallCard.svg',
        './src/assets/spendLimit.svg',
        './src/assets/transactions.svg',
        './src/assets/user.svg',
        './src/assets/visa.svg',
        './src/assets/whiteLogoIcon.svg',
        './src/assets/whiteLogoLarge.svg',
        './src/assets/whiteLogoSmall.svg',
      ])
    })
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.url.match(/\.(?:png|jpg|jpeg|svg|gif|webp)$/)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          return caches.open('img-cache').then((cache) => {
            cache.put(event.request, response.clone())
            return response
          })
        })
      })
    )
  }
})
