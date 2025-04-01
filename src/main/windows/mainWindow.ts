import { ipcMain, Menu } from 'electron'
import createWindow from './../functional/createWindow'
import type { RouterMessage } from './../types/routerTypes'
import createMainMenu from './../menu/mainMenu'
import {
  addIpcMainHandleFn,
  removeIpcMainHandlerFn,
  addIpcMainOnFn,
  removeIpcMainOnFn
} from './../ipcMain/index'
import { resetProgressBar } from './../functional/progressBar'
import registryShortcut from './../functional/registryShortcut'
import createTray from './../tray'
import { userDialogPageWindow } from './../ipcMain/onFn/userDialogPage'

function createMainWindow() {
  const mainWindow = createWindow({
    title: '主窗口',
    width: 800,
    height: 600,
    maximizable: true,
    minimizable: true
  })

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('router', {
      type: 'replace',
      router: {
        path: '/home'
      }
    } as RouterMessage)

    registryShortcut()
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

  const mainMenu = createMainMenu(mainWindow)
  Menu.setApplicationMenu(Menu.buildFromTemplate(mainMenu))

  return mainWindow
}

export default createMainWindow
