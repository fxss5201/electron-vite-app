import { BrowserWindow, app } from 'electron'
import { join } from 'path'
import type { BaseWindowConstructorOptions, BrowserWindowConstructorOptions } from 'electron/main'
import { is } from '@electron-toolkit/utils'
import icon from '../../../resources/icon.png?asset'

function createWindow(option: BaseWindowConstructorOptions): BrowserWindow {
  const defaultConfig: BrowserWindowConstructorOptions = {
    show: false,
    ...(process.platform === 'linux' || !app.isPackaged ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  }

  const configs: BrowserWindowConstructorOptions = { ...defaultConfig, ...option }

  const win = new BrowserWindow(configs)

  win.on('ready-to-show', () => {
    win.show()
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return win
}

export default createWindow
