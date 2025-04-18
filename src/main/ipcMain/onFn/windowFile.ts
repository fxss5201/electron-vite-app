import createWindow from './../../functional/createWindow'
import type { RouterMessage } from './../../types/routerTypes'
import { readFile } from './../../functional/file'

interface BaseFile {
  name: string
  path: string
}

export interface BaseFileContent extends BaseFile {
  content?: string | Buffer
}

interface OpenWindowFileArgs {
  file: BaseFileContent
  fileList: BaseFileContent[]
}

let windowFile: Electron.BrowserWindow | null = null

export function openWindowFile(_event: Electron.IpcMainEvent, val: OpenWindowFileArgs) {
  console.log('openWindowFile', val)
  if (!windowFile || windowFile?.isDestroyed()) {
    windowFile = createWindow({
      title: '文件窗口',
      width: 800,
      height: 600,
      maximizable: true,
      minimizable: true,
      titleBarStyle: 'hidden',
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        contextIsolation: false
      }
    })
    windowFile.webContents.on('did-finish-load', () => {
      windowFile!.webContents.send('router', {
        type: 'replace',
        router: {
          path: '/fileView'
        }
      } as RouterMessage)
      windowFile!.webContents.send('windowFileInfo', {
        file: {
          ...val.file,
          content: val.file.content ? val.file.content : readFile(val.file.path)
        },
        fileList: val.fileList
      })
    })
  } else {
    if (windowFile.isMinimized()) {
      windowFile.restore()
    } else {
      windowFile.focus()
    }
    windowFile.webContents.send('windowFileInfo', {
      file: {
        ...val.file,
        content: val.file.content ? val.file.content : readFile(val.file.path)
      },
      fileList: val.fileList
    })
  }
}
