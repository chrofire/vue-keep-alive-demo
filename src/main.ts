import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import stores from '@/stores'

import 'uno.css'
import 'normalize.css'
import '@/styles/index.scss'

const start = async () => {
    const app = createApp(App)

    app.use(router)
    app.use(stores)

    app.mount('#app')
}

start()
