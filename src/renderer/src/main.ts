import './assets/main.css'
import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import log from 'electron-log/renderer'
import type { RouterMessage } from './types/routerType'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import * as Sentry from '@sentry/electron/renderer'

Sentry.init({
  environment: import.meta.env.MODE,
  integrations: []
})

log.info('Log from the renderer process')

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(pinia)
app.use(ContextMenu)
app.mount('#app')

window.electron.ipcRenderer.on('router', (_event, message: RouterMessage) => {
  router[message.type](message.router)
})
