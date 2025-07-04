import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { setUserInfo } from './data/mocks/getUserInfo'
import { setCreditInfo } from './data/mocks/getCreditInfo'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((reg) => console.log('SW registered', reg))
    .catch((err) => console.error('SW registration failed', err))
}

setUserInfo()
setCreditInfo()

const app = createApp(App)
app.config.performance = true
app.mount('#app')
