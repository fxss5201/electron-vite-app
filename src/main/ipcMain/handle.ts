import { ipcMain } from 'electron'
import { controllerMap } from './../db/index'
import { pingHandle } from './handle/pingHandle'

export function addIpcMainHandleFn() {
  for (const key in controllerMap) {
    if (Object.prototype.hasOwnProperty.call(controllerMap, key)) {
      const action = controllerMap[key]
      ipcMain.handle(key, async (_event: Electron.IpcMainInvokeEvent, ...args: unknown[]) => {
        console.log('ipcMain handle: ', key, args)
        const res = await action(...args)
        console.log('ipcMain handle result: ', key, res)
        return res
      })
    }
  }

  ipcMain.handle('ping', pingHandle)
}

export function removeIpcMainHandlerFn() {
  for (const key in controllerMap) {
    if (Object.prototype.hasOwnProperty.call(controllerMap, key)) {
      ipcMain.removeHandler(key)
    }
  }

  ipcMain.removeHandler('ping')
}
