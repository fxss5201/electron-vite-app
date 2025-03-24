let progressInterval: NodeJS.Timeout
const INCREMENT = 0.03
const INTERVAL_DELAY = 300
let progress = 0

function createInterval(win: Electron.CrossProcessExports.BrowserWindow) {
  if (progressInterval) clearInterval(progressInterval)
  progressInterval = setInterval(() => {
    win.setProgressBar(progress)
    if (progress < 2) {
      progress += INCREMENT
    } else {
      progress = -1
      win.setProgressBar(progress)
      clearInterval(progressInterval)
    }
  }, INTERVAL_DELAY)
}

export function startProgressBar(win: Electron.CrossProcessExports.BrowserWindow) {
  progress = 0
  createInterval(win)
}

export function pauseProgressBar() {
  if (progressInterval) clearInterval(progressInterval)
}

export function resumeProgressBar(win: Electron.CrossProcessExports.BrowserWindow) {
  createInterval(win)
}

export function resetProgressBar(win: Electron.CrossProcessExports.BrowserWindow) {
  progress = -1
  win.setProgressBar(-1)
  if (progressInterval) clearInterval(progressInterval)
}
