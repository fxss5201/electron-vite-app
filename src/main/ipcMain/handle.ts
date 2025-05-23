import { ipcMain } from 'electron'
import { controllerMap } from './../db/index'
import { pingHandle } from './handle/pingHandle'
import chalk from 'chalk'
import { setTaskbarPosition, getTaskbarPosition } from './handle/taskbarPosition'
import { openDirectoryFiles } from './handle/dialogHandle'

export function addIpcMainHandleFn() {
  for (const key in controllerMap) {
    if (Object.prototype.hasOwnProperty.call(controllerMap, key)) {
      const action = controllerMap[key]
      ipcMain.handle(key, async (_event: Electron.IpcMainInvokeEvent, ...args: unknown[]) => {
        console.log('ipcMain handle: ', chalk.blue(key), args)
        const res = await action(...args)
        console.log('ipcMain handle result: ', chalk.blue(key), res)
        return res
      })
    }
  }

  ipcMain.handle('ping', pingHandle)
  ipcMain.handle('setTaskbarPosition', setTaskbarPosition)
  ipcMain.handle('getTaskbarPosition', getTaskbarPosition)
  ipcMain.handle('openDirectoryFiles', openDirectoryFiles)
}

export function removeIpcMainHandlerFn() {
  for (const key in controllerMap) {
    if (Object.prototype.hasOwnProperty.call(controllerMap, key)) {
      ipcMain.removeHandler(key)
    }
  }

  ipcMain.removeHandler('ping')
  ipcMain.removeHandler('setTaskbarPosition')
  ipcMain.removeHandler('getTaskbarPosition')
  ipcMain.removeHandler('openDirectoryFiles')
}
