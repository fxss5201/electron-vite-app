import { app, BrowserWindow } from 'electron'
import started from 'electron-squirrel-startup'
import './functional/log'
import './functional/checkUpdate'
import createLoginWindow from './windows/loginWindow'
import createMainWindow from './windows/mainWindow'
import store from './stores'
import { connectToDatabase, destroyDatabase } from './db/index'

if (started) {
  app.quit()
}

function createWindow() {
  if (store.get('user').account) {
    createMainWindow()
  } else {
    createLoginWindow()
  }
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
  await destroyDatabase()
})
