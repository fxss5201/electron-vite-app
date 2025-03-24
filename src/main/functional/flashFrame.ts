export function startFlashFrame(win: Electron.CrossProcessExports.BrowserWindow) {
  win.flashFrame(true)
}

export function stopFlashFrame(win: Electron.CrossProcessExports.BrowserWindow) {
  win.flashFrame(false)
}
