import { nativeImage } from 'electron'
import iconPath from '../../../resources/icon.png?asset'
import blackPath from '../../../resources/black.svg?asset'

const icon = nativeImage.createFromPath(iconPath)
const black = nativeImage.createFromPath(blackPath)

let flashTrayIconTimeout: NodeJS.Timeout
let flashTrayBlackTimeout: NodeJS.Timeout
let startTime = 0

export function startFlashTray(tray: Electron.Tray, timer = 8000) {
  if (timer !== 0 && startTime === 0) startTime = Date.now()
  if (flashTrayBlackTimeout) clearTimeout(flashTrayBlackTimeout)
  if (flashTrayIconTimeout) clearTimeout(flashTrayIconTimeout)
  flashTrayBlackTimeout = setTimeout(() => {
    tray.setImage(black)
    flashTrayIconTimeout = setTimeout(() => {
      tray.setImage(icon)
      if (timer === 0) {
        startFlashTray(tray, timer)
      } else {
        const now = Date.now()
        if (now - startTime < timer) {
          startFlashTray(tray, timer)
        } else {
          startTime = 0
        }
      }
    }, 300)
  }, 500)
}

export function stopFlashTray(tray: Electron.Tray) {
  tray.setImage(icon)
  if (flashTrayBlackTimeout) clearTimeout(flashTrayBlackTimeout)
  if (flashTrayIconTimeout) clearTimeout(flashTrayIconTimeout)
  startTime = 0
}
