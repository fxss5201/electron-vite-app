import { BrowserWindow } from 'electron'
import { ipcMain } from 'electron'
import createWindow from './../functional/createWindow'
import createMainWindow from './mainWindow'
import type { RouterMessage } from './../types/routerTypes'
import store from '../stores'

function createLoginWindow(): BrowserWindow {
  const loginWindow = createWindow({
    title: '登录',
    width: 416,
    height: 368,
    resizable: false,
    center: true,
    closable: true,
    movable: true
  })

  loginWindow.setMenu(null)

  loginWindow.webContents.on('did-finish-load', () => {
    loginWindow.webContents.send('router', {
      type: 'replace',
      router: {
        path: '/login'
      }
    } as RouterMessage)
  })

  ipcMain.once('login', (event: Electron.IpcMainEvent, form) => {
    console.log('form', form)
    loginWindow.close()
    store.set('user', form)
    createMainWindow()
  })

  return loginWindow
}

export default createLoginWindow
