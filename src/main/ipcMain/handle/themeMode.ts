import { nativeTheme } from 'electron'
import store from '../../stores'
import type { ThemeType } from './../../types/StoreType'

export function setThemeMode(_event: Electron.IpcMainInvokeEvent, val: ThemeType) {
  nativeTheme.themeSource = val
  store.set('theme', nativeTheme.themeSource)
  return nativeTheme.themeSource
}

export function getThemeMode() {
  const theme = store.get('theme')
  return theme || 'system'
}
