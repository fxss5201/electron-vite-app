import { nativeTheme } from 'electron'
import Store from 'electron-store'
import type { StoreType } from './../types/StoreType'

const store = new Store<StoreType>({
  defaults: {
    user: {
      account: '',
      password: ''
    },
    theme: 'system',
    taskbarPosition: 'left'
  }
  // encryptionKey: 'secret'
})

const theme = store.get('theme')
if (theme) {
  nativeTheme.themeSource = theme
} else {
  nativeTheme.themeSource = 'system'
  store.set('theme', 'system')
}

export default store
