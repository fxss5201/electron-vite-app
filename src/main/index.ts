import { app, BrowserWindow } from 'electron'
import started from 'electron-squirrel-startup'
import './functional/log'
import createLoginWindow from './windows/loginWindow'
import createMainWindow from './windows/mainWindow'
import store from './stores'
import { connectToDatabase, destroyDatabase } from './db/index'
import chalk from 'chalk'
import debug from 'electron-debug'
import * as Sentry from '@sentry/electron/main'
import { registerShortcut, unregisterShortcut } from './functional/registryShortcut'

Sentry.init({
  dsn: 'https://65685402eaa68980f7d1f8db3cd1fa44@o412908.ingest.us.sentry.io/4509081523519493',
  environment: app.isPackaged ? 'production' : 'development'
})

chalk.level = 1

if (started) {
  app.quit()
}

debug()

let mainBrowserWindow: BrowserWindow | null = null

function createWindow() {
  if (store.get('user').account) {
    mainBrowserWindow = createMainWindow()
  } else {
    createLoginWindow()
  }
  registerShortcut()
}

app.whenReady().then(async () => {
  await connectToDatabase()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', async () => {
  unregisterShortcut()
  await destroyDatabase()
})

export { mainBrowserWindow }
