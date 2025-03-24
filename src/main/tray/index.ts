import { Tray, nativeImage, Menu } from 'electron'
import store from './../stores/index'
import createLoginWindow from './../windows/loginWindow'
import iconPath from '../../../resources/icon.png?asset'

export default function createTray(win: Electron.CrossProcessExports.BrowserWindow): Tray {
  const icon = nativeImage.createFromPath(iconPath)
  const tray = new Tray(icon)
  const trayMenu = Menu.buildFromTemplate([
    {
      label: '打开主窗口',
      click: () => {
        win.show()
      }
    },
    {
      label: '退出登录',
      click: () => {
        store.set('user', {
          account: '',
          password: ''
        })
        win.close()
        createLoginWindow()
      }
    },
    { type: 'separator' },
    {
      label: '关闭app',
      role: process.platform === 'darwin' ? 'close' : 'quit'
    }
  ])
  tray.setTitle('electron-vite-app')
  tray.setToolTip('electron-vite-app')
  tray.setContextMenu(trayMenu)
  tray.on('click', () => {
    win.show()
  })
  return tray
}
