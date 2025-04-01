import createWindow from './../../functional/createWindow'
import type { RouterMessage } from './../../types/routerTypes'
import { mainBrowserWindow } from './../../index'

let userDialogPageWindow: Electron.BrowserWindow | null = null

interface UserDialogPageType {
  id?: number
}

export function userDialogPage(_event: Electron.IpcMainEvent, val: UserDialogPageType) {
  const windowConfig: Electron.BrowserWindowConstructorOptions = {
    width: 500,
    height: 220,
    maximizable: true,
    minimizable: true,
    autoHideMenuBar: true
  }
  if (!userDialogPageWindow) {
    userDialogPageWindow = createWindow(windowConfig)
    userDialogPageWindow.webContents.on('did-finish-load', () => {
      userDialogPageWindow!.webContents.send('router', {
        type: 'replace',
        router: {
          path: '/sqlite/userDialogPage',
          query: {
            id: val.id
          }
        }
      } as RouterMessage)
    })

    userDialogPageWindow.once('close', () => {
      mainBrowserWindow!.webContents.send('userDialogPageClose')
    })
    userDialogPageWindow.once('closed', () => {
      userDialogPageWindow = null
    })
  }
}

export function removeUserDialogPageWindow() {
  if (userDialogPageWindow) {
    userDialogPageWindow.close()
  }
}

export function userDialogPageWindowConfirm() {
  mainBrowserWindow!.webContents.send('userDialogPageConfirm')
  if (userDialogPageWindow) {
    userDialogPageWindow.close()
  }
}
