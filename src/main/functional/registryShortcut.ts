import { BrowserWindow, globalShortcut } from 'electron'

function registryShortcut() {
  registryDevShortcut()
}

function registryDevShortcut() {
  globalShortcut.register('CommandOrControl+F12', () => {
    // 获取当前窗口，并注册快捷键
    BrowserWindow.getFocusedWindow()?.webContents.openDevTools()
  })

  globalShortcut.register('CommandOrControl+F5', () => {
    BrowserWindow.getFocusedWindow()?.webContents.reload()
  })
}

export default registryShortcut
