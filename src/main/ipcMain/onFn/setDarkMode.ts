import { nativeTheme } from 'electron'
import store from '../../stores'

export function setDarkMode(event: Electron.IpcMainEvent, val: boolean) {
  if (val) {
    nativeTheme.themeSource = 'dark'
  } else {
    nativeTheme.themeSource = 'light'
  }
  store.set('theme', nativeTheme.themeSource)
}
