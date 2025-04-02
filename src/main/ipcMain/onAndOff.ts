import { ipcMain } from 'electron'
import {
  startProgressBar,
  pauseProgressBar,
  resumeProgressBar,
  resetProgressBar
} from '../functional/progressBar'
import { startFlashFrame, stopFlashFrame } from '../functional/flashFrame'
import { startFlashTray, stopFlashTray } from '../functional/flashTray'
import { sendNotification } from './onFn/sendNotification'
import {
  userDialogPage,
  removeUserDialogPageWindow,
  userDialogPageWindowConfirm
} from './onFn/userDialogPage'

export function addIpcMainOnFn(
  win: Electron.CrossProcessExports.BrowserWindow,
  tray: Electron.Tray
) {
  ipcMain.addListener('sendNotification', sendNotification)

  ipcMain.addListener('startProgressBar', () => {
    startProgressBar(win)
  })
  ipcMain.addListener('pauseProgressBar', () => {
    pauseProgressBar()
  })
  ipcMain.addListener('resumeProgressBar', () => {
    resumeProgressBar(win)
  })
  ipcMain.addListener('resetProgressBar', () => {
    resetProgressBar(win)
  })

  ipcMain.addListener('startFlashFrame', () => {
    startFlashFrame(win)
  })
  ipcMain.addListener('stopFlashFrame', () => {
    stopFlashFrame(win)
  })

  ipcMain.addListener('startFlashTray', (_event: Electron.IpcMainEvent, time: number) => {
    startFlashTray(tray, time)
  })
  ipcMain.addListener('stopFlashTray', () => {
    stopFlashTray(tray)
  })

  ipcMain.addListener('userDialogPage', userDialogPage)
  ipcMain.addListener('removeUserDialogPageWindow', removeUserDialogPageWindow)
  ipcMain.addListener('userDialogPageWindowConfirm', userDialogPageWindowConfirm)
}

export function removeIpcMainOnFn() {
  ipcMain.removeListener('sendNotification', sendNotification)

  ipcMain.removeAllListeners('startProgressBar')
  ipcMain.removeAllListeners('pauseProgressBar')
  ipcMain.removeAllListeners('resumeProgressBar')
  ipcMain.removeAllListeners('resetProgressBar')

  ipcMain.removeAllListeners('startFlashFrame')
  ipcMain.removeAllListeners('stopFlashFrame')

  ipcMain.removeAllListeners('startFlashTray')
  ipcMain.removeAllListeners('stopFlashTray')

  ipcMain.removeAllListeners('userDialogPage')
  ipcMain.removeAllListeners('removeUserDialogPageWindow')
  ipcMain.removeAllListeners('userDialogPageWindowConfirm')
}
