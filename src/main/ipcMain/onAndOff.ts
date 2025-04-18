import { ipcMain, BrowserWindow } from 'electron'
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
import { openWindowFile } from './onFn/windowFile'

export function addIpcMainOnFn(tray: Electron.Tray) {
  ipcMain.addListener('sendNotification', sendNotification)

  ipcMain.addListener('startProgressBar', (event: Electron.IpcMainEvent) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) startProgressBar(win)
  })
  ipcMain.addListener('pauseProgressBar', () => {
    pauseProgressBar()
  })
  ipcMain.addListener('resumeProgressBar', (event: Electron.IpcMainEvent) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) resumeProgressBar(win)
  })
  ipcMain.addListener('resetProgressBar', (event: Electron.IpcMainEvent) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) resetProgressBar(win)
  })

  ipcMain.addListener('startFlashFrame', (event: Electron.IpcMainEvent) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) startFlashFrame(win)
  })
  ipcMain.addListener('stopFlashFrame', (event: Electron.IpcMainEvent) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) stopFlashFrame(win)
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

  ipcMain.addListener('openWindowFile', openWindowFile)
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

  ipcMain.removeAllListeners('openWindowFile')
}
