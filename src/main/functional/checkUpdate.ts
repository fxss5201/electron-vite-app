import { app, dialog, ipcMain } from 'electron'
import { autoUpdater, UpdateInfo } from 'electron-updater'
// import { is } from '@electron-toolkit/utils'
// import { join } from 'path'
import log from 'electron-log/main'
import createWindow from './createWindow'
import type { RouterMessage } from './../types/routerTypes'
import { mainBrowserWindow } from './../windows/mainWindow'
import dayjs from 'dayjs'
import { CronJob } from 'cron'

type checkUpdateFromType = 'system' | 'user'
let checkUpdateFrom: checkUpdateFromType = 'system'

let downloadWin: Electron.BrowserWindow | null = null
const updateMessage = {
  version: app.getVersion(), // 当前版本号
  releaseDate: '', // 当前发布日期
  newVersion: '', // 最新版本号
  newReleaseDate: '', // 最新发布日期
  shouldUpdate: false // 是否需要更新
}

// dev-start, 这里是为了在本地做应用升级测试使用，正式环境请务必删除
// if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
//   autoUpdater.updateConfigPath = join(__dirname, '../../dev-app-update.yml')
// }
// Object.defineProperty(app, 'isPackaged', {
//   get() {
//     return true
//   }
// })
// dev-end

// 触发检查更新(此方法用于被渲染线程调用，例如页面点击检查更新按钮来调用此方法)
ipcMain.on('check-for-update', () => {
  log.info('触发检查更新')
  autoUpdater.checkForUpdates()
  if (checkUpdateFrom === 'user') return
  checkUpdateFrom = 'user'
  setTimeout(
    () => {
      checkUpdateFrom = 'system'
    },
    1000 * 60 * 10 // 10分钟后重置 checkUpdateFrom
  )
})

// 设置自动下载为false(默认为true，检测到有更新就自动下载)
autoUpdater.autoDownload = false

// 检测下载错误
autoUpdater.on('error', (error) => {
  log.error('更新异常', error)
  if (checkUpdateFrom === 'system') return
  dialog.showErrorBox('更新异常', error == null ? '未知错误' : (error.stack || error).toString())
})

// 检测是否需要更新
autoUpdater.on('checking-for-update', () => {
  log.info('正在检查更新……')
  if (checkUpdateFrom === 'system') return
  dialog.showMessageBox({
    title: '更新提示',
    message: '正在检查更新……'
  })
})

// 检测到可以更新时
autoUpdater.on('update-available', (releaseInfo: UpdateInfo) => {
  log.info('检测到新版本，确认是否下载', releaseInfo)
  updateMessage.newVersion = releaseInfo.version
  updateMessage.newReleaseDate = dayjs(releaseInfo.releaseDate).format('YYYY-MM-DD HH:mm:ss')
  updateMessage.shouldUpdate = true
  mainBrowserWindow!.webContents.send('updateAvailable', updateMessage)
})

ipcMain.on('updateDownload', () => {
  if (!downloadWin || downloadWin?.isDestroyed()) {
    downloadWin = createWindow({
      title: '主窗口',
      width: 350,
      height: 350,
      autoHideMenuBar: true
    })

    downloadWin.webContents.on('did-finish-load', () => {
      downloadWin!.webContents.send('router', {
        type: 'replace',
        router: {
          path: '/downloadView'
        }
      } as RouterMessage)
    })
    autoUpdater.downloadUpdate()
  } else {
    if (downloadWin.isMinimized()) {
      downloadWin.restore()
    } else {
      downloadWin.focus()
    }
  }
})

// 检测到不需要更新时
autoUpdater.on('update-not-available', (releaseInfo: UpdateInfo) => {
  log.info('现在使用的就是最新版本，不用更新', releaseInfo)
  updateMessage.releaseDate = dayjs(releaseInfo.releaseDate).format('YYYY-MM-DD HH:mm:ss')
  updateMessage.shouldUpdate = false
  mainBrowserWindow!.webContents.send('updateAvailable', updateMessage)
  if (checkUpdateFrom === 'system') return
  dialog.showMessageBox({
    title: '更新提示',
    message: '当前已是最新版本'
  })
})

// 更新下载进度
autoUpdater.on('download-progress', (progress) => {
  log.info('下载进度', progress)
  if (downloadWin?.isDestroyed()) return
  downloadWin?.webContents.send('downloadProgress', progress.percent)
})

// 当需要更新的内容下载完成后
autoUpdater.on('update-downloaded', () => {
  log.info('下载完成，准备更新')
  dialog
    .showMessageBox({
      title: '安装更新',
      message: '更新下载完毕，应用将重启并进行安装'
    })
    .then(() => {
      // 退出并安装应用
      setImmediate(() => autoUpdater.quitAndInstall())
    })
})

// 每1小时检查一次更新
new CronJob(
  '0 0 * * * *',
  () => {
    if (mainBrowserWindow && !mainBrowserWindow?.isDestroyed()) {
      checkUpdateFrom = 'system'
      checkUpdate()
    }
  },
  null,
  true,
  'Asia/Shanghai'
)

export function checkUpdate() {
  autoUpdater.checkForUpdates()
  setTimeout(() => {
    mainBrowserWindow!.webContents.send('updateAvailable', updateMessage)
  })
}
