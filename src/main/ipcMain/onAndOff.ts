import { ipcMain } from 'electron'
import {
  startProgressBar,
  pauseProgressBar,
  resumeProgressBar,
  resetProgressBar
} from '../functional/progressBar'
import { startFlashFrame, stopFlashFrame } from '../functional/flashFrame'
import { startFlashTray, stopFlashTray } from '../functional/flashTray'
import { setDarkMode } from './onFn/setDarkMode'
import { sendNotification } from './onFn/sendNotification'

export function addIpcMainOnFn(
  win: Electron.CrossProcessExports.BrowserWindow,
  tray: Electron.Tray
) {
  ipcMain.on('setDarkMode', setDarkMode)
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

  ipcMain.addListener('startFlashTray', (event: Electron.IpcMainEvent, time: number) => {
    startFlashTray(tray, time)
  })
  ipcMain.addListener('stopFlashTray', () => {
    stopFlashTray(tray)
  })
}

export function removeIpcMainOnFn() {
  ipcMain.off('setDarkMode', setDarkMode)
  ipcMain.removeListener('sendNotification', sendNotification)

  ipcMain.removeAllListeners('startProgressBar')
  ipcMain.removeAllListeners('pauseProgressBar')
  ipcMain.removeAllListeners('resumeProgressBar')
  ipcMain.removeAllListeners('resetProgressBar')

  ipcMain.removeAllListeners('startFlashFrame')
  ipcMain.removeAllListeners('stopFlashFrame')

  ipcMain.removeAllListeners('startFlashTray')
  ipcMain.removeAllListeners('stopFlashTray')
}
