import { ipcMain, Menu } from 'electron'
import createWindow from './../functional/createWindow'
import { checkUpdate } from './../functional/checkUpdate'
import type { RouterMessage } from './../types/routerTypes'
import createMainMenu from './../menu/mainMenu'
import {
  addIpcMainHandleFn,
  removeIpcMainHandlerFn,
  addIpcMainOnFn,
  removeIpcMainOnFn
} from './../ipcMain/index'
import { resetProgressBar } from './../functional/progressBar'
import createTray from './../tray'
import { userDialogPageWindow } from './../ipcMain/onFn/userDialogPage'
import store from './../stores'
import type { BaseWindowConstructorOptions } from 'electron/main'

function createMainWindow() {
  const mainWindowBounds = store.get('mainWindowBounds')
  const mainWindowIsMaximized = store.get('mainWindowIsMaximized')
  let mainWindowOption: BaseWindowConstructorOptions = {
    title: '主窗口',
    width: 800,
    height: 600,
    maximizable: true,
    minimizable: true,
    autoHideMenuBar: true
  }
  if (mainWindowBounds) {
    mainWindowOption = {
      ...mainWindowOption,
      ...mainWindowBounds
    }
  }
  const mainWindow = createWindow(mainWindowOption)
  if (mainWindowIsMaximized) {
    mainWindow.maximize()
  }

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('router', {
      type: 'replace',
      router: {
        path: '/home'
      }
    } as RouterMessage)

    checkUpdate()
  })

  ipcMain.once('open-window', () => {
    createMainWindow()
  })

  const tray = createTray(mainWindow)
  addIpcMainHandleFn()
  addIpcMainOnFn(mainWindow, tray)

  mainWindow.on('close', () => {
    resetProgressBar(mainWindow)
    removeIpcMainHandlerFn()
    removeIpcMainOnFn()
    tray.destroy()
    userDialogPageWindow?.close()
  })

  function changeBoundsFn() {
    const bounds = mainWindow.getBounds()
    store.set('mainWindowBounds', bounds)
  }
  mainWindow.on('resized', () => {
    changeBoundsFn()
  })
  mainWindow.on('moved', () => {
    changeBoundsFn()
  })
  mainWindow.on('maximize', () => {
    store.set('mainWindowIsMaximized', true)
  })
  mainWindow.on('unmaximize', () => {
    store.set('mainWindowIsMaximized', false)
  })

  const mainMenu = createMainMenu(mainWindow)
  Menu.setApplicationMenu(Menu.buildFromTemplate(mainMenu))

  return mainWindow
}

export default createMainWindow
