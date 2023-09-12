import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { plugin as formkitPlugin, defaultConfig as formkitConfig } from '@formkit/vue'
import config from '../formkit.config'

const app = createApp(App)

app.use(router)

app.use(formkitPlugin, formkitConfig(config))

app.mount('#app')
