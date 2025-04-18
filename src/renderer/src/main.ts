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
import '@icon-park/vue-next/styles/index.css'
import * as Sentry from '@sentry/electron/renderer'
import { useSettingStore } from '@renderer/stores/settingStore'
import type { SettingType } from '@renderer/types/setting'
import { useVersionStore } from '@renderer/stores/versionStore'
import type { versionType } from '@renderer/types/versionType'
import { useWindowFileStore } from '@renderer/stores/windowFileStore'
import type { BaseFileContent } from '@renderer/types/fileType'

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

let themeFlag = false
let taskbarPositionFlag = false
const settingStore = useSettingStore()
router.beforeEach(async (to) => {
  if (!themeFlag) {
    themeFlag = true
    const theme = (await window.electron.ipcRenderer.invoke('getThemeMode')) as SettingType['theme']
    settingStore.setSettingThemeStore(theme)
  }
  if (to.path.includes('/home') && !taskbarPositionFlag) {
    taskbarPositionFlag = true
    const taskbarPosition = (await window.electron.ipcRenderer.invoke(
      'getTaskbarPosition'
    )) as SettingType['taskbarPosition']
    settingStore.setSettingTaskbarPositionStore(taskbarPosition)
  }
})

window.electron.ipcRenderer.on('router', (_event, message: RouterMessage) => {
  router[message.type](message.router)
})
window.electron.ipcRenderer.on('updateAvailable', (_event, versionInfo: versionType) => {
  const versionStore = useVersionStore()
  versionStore.setVersionInfo(versionInfo)
})
interface WindowFileInfoArgs {
  file: BaseFileContent
  fileList: BaseFileContent[]
}
window.electron.ipcRenderer.on('windowFileInfo', (_event, val: WindowFileInfoArgs) => {
  const windowFileStore = useWindowFileStore()
  windowFileStore.setFile(val.file)
  windowFileStore.setFileList(val.fileList)
})
