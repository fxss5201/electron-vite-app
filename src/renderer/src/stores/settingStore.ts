import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SettingType } from '@renderer/types/setting'

export const useSettingStore = defineStore(
  'settingStore',
  () => {
    const setting = ref<SettingType>({
      theme: 'system',
      taskbarPosition: 'left'
    })

    function setSetting(val: SettingType) {
      setting.value = val
    }

    function setSettingThemeStore(val: SettingType['theme']) {
      setting.value.theme = val
    }

    async function setSettingTheme(val: SettingType['theme']) {
      await window.electron.ipcRenderer.invoke('setThemeMode', val)
      setting.value.theme = val
    }

    function setSettingTaskbarPositionStore(val: SettingType['taskbarPosition']) {
      setting.value.taskbarPosition = val
    }

    async function setSettingTaskbarPosition(val: SettingType['taskbarPosition']) {
      await window.electron.ipcRenderer.invoke('setTaskbarPosition', val)
      setting.value.taskbarPosition = val
    }

    return {
      setting,
      setSetting,
      setSettingTheme,
      setSettingThemeStore,
      setSettingTaskbarPosition,
      setSettingTaskbarPositionStore
    }
  },
  {
    persist: true
  }
)
