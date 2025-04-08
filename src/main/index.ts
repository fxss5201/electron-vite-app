import { app, BrowserWindow, ipcMain } from 'electron'
import started from 'electron-squirrel-startup'
import './functional/log'
import { checkUpdate } from './functional/checkUpdate'
import createLoginWindow from './windows/loginWindow'
import createMainWindow from './windows/mainWindow'
import store from './stores'
import { connectToDatabase, destroyDatabase } from './db/index'
import chalk from 'chalk'
import debug from 'electron-debug'
import * as Sentry from '@sentry/electron/main'
import { registerShortcut, unregisterShortcut } from './functional/registryShortcut'
import { setThemeMode, getThemeMode } from './ipcMain/handle/themeMode'

Sentry.init({
  dsn: 'https://65685402eaa68980f7d1f8db3cd1fa44@o412908.ingest.us.sentry.io/4509081523519493',
  environment: app.isPackaged ? 'production' : 'development'
})

chalk.level = 1

if (started) {
  app.quit()
}

debug()

function createWindow() {
  if (store.get('user').account) {
    const mainWin = createMainWindow()
    mainWin.webContents.on('did-finish-load', () => {
      checkUpdate()
    })
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

  ipcMain.handle('setThemeMode', setThemeMode)
  ipcMain.handle('getThemeMode', getThemeMode)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', async () => {
  unregisterShortcut()

  ipcMain.removeHandler('setThemeMode')
  ipcMain.removeHandler('getThemeMode')

  await destroyDatabase()
})
