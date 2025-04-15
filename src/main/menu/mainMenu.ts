import store from './../stores/index'
import createLoginWindow from './../windows/loginWindow'
import { openExternal } from './../functional/openExternal'

function createMainMenu(
  mainWindow: Electron.CrossProcessExports.BrowserWindow
): Array<Electron.MenuItemConstructorOptions | Electron.MenuItem> {
  return [
    {
      label: '菜单',
      submenu: [
        {
          label: '首页',
          click: () => {
            mainWindow.webContents.send('router', {
              type: 'replace',
              router: {
                path: '/home'
              }
            })
          }
        },
        { type: 'separator' },
        {
          label: '退出登录',
          click: () => {
            store.set('user', {
              account: '',
              password: ''
            })
            mainWindow.close()
            createLoginWindow()
          }
        }
      ]
    },
    {
      label: '示例',
      submenu: [
        {
          label: '暗黑模式',
          click: () => {
            mainWindow.webContents.send('router', {
              type: 'replace',
              router: {
                path: '/darkMode'
              }
            })
          }
        },
        {
          label: '进度条',
          click: () => {
            mainWindow.webContents.send('router', {
              type: 'replace',
              router: {
                path: '/progressBar'
              }
            })
          }
        },
        {
          label: '通知',
          click: () => {
            mainWindow.webContents.send('router', {
              type: 'replace',
              router: {
                path: '/notifications'
              }
            })
          }
        },
        {
          label: '任务栏图标闪烁',
          click: () => {
            mainWindow.webContents.send('router', {
              type: 'replace',
              router: {
                path: '/flashFrame'
              }
            })
          }
        },
        {
          label: 'Tray图标闪烁',
          click: () => {
            mainWindow.webContents.send('router', {
              type: 'replace',
              router: {
                path: '/flashTray'
              }
            })
          }
        },
        { type: 'separator' },
        {
          label: '文档目录',
          click: () => {
            mainWindow.webContents.send('router', {
              type: 'replace',
              router: {
                path: '/directoryView'
              }
            })
          }
        }
      ]
    },
    {
      label: '数据库',
      submenu: [
        {
          label: 'sqlite',
          submenu: [
            {
              label: '用户列表',
              click: () => {
                mainWindow.webContents.send('router', {
                  type: 'replace',
                  router: {
                    path: '/sqlite/userList'
                  }
                })
              }
            },
            {
              label: '用户弹窗',
              click: () => {
                mainWindow.webContents.send('router', {
                  type: 'replace',
                  router: {
                    path: '/sqlite/userWindow'
                  }
                })
              }
            }
          ]
        },
        {
          label: 'indexedDB',
          submenu: [
            {
              label: 'dexie',
              submenu: [
                {
                  label: '用户列表',
                  click: () => {
                    mainWindow.webContents.send('router', {
                      type: 'replace',
                      router: {
                        path: '/indexedDB/dexie/userList'
                      }
                    })
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      label: '窗口',
      role: 'window',
      submenu: [
        {
          label: '最小化',
          role: 'minimize'
        },
        {
          label: '全屏',
          role: 'togglefullscreen'
        },
        {
          label: '关闭app',
          role: process.platform === 'darwin' ? 'close' : 'quit'
        }
      ]
    },
    {
      label: '帮助',
      role: 'help',
      submenu: [
        {
          label: '关于',
          click: async () => {
            openExternal('https://github.com/fxss5201/electron-vite-app')
          }
        }
      ]
    }
  ]
}

export default createMainMenu
