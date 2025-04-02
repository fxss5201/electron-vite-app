import { app, BrowserWindow, globalShortcut, dialog } from 'electron'

function registerShortcut() {
  registerDevShortcut()
}

function registerDevShortcut() {
  const CommandOrControlF12 = globalShortcut.register('CommandOrControl+F12', () => {
    // 获取当前窗口，并注册快捷键
    BrowserWindow.getFocusedWindow()?.webContents.openDevTools()
  })

  const CommandOrControlF15 = globalShortcut.register('CommandOrControl+F5', () => {
    BrowserWindow.getFocusedWindow()?.webContents.reload()
  })

  if (!app.isPackaged && !(CommandOrControlF12 && CommandOrControlF15)) {
    dialog.showErrorBox(
      '注册快捷键失败',
      '注册快捷键失败，请检查是否已被占用。\n快捷键为：CommandOrControl+F12、CommandOrControl+F5'
    )
  }
}

function unregisterShortcut() {
  globalShortcut.unregister('CommandOrControl+F12')
  globalShortcut.unregister('CommandOrControl+F5')
}

export { registerShortcut, unregisterShortcut }
