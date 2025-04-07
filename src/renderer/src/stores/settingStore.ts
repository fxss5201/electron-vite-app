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

    async function setSettingTheme(val: SettingType['theme']) {
      await window.electron.ipcRenderer.invoke('setThemeMode', val)
      setting.value.theme = val
    }
    function getSettingTheme() {
      return setting.value.theme
    }

    async function setSettingTaskbarPosition(val: SettingType['taskbarPosition']) {
      await window.electron.ipcRenderer.invoke('setTaskbarPosition', val)
      setting.value.taskbarPosition = val
    }
    function getSettingTaskbarPosition() {
      return setting.value.taskbarPosition
    }

    return {
      setting,
      setSetting,
      setSettingTheme,
      getSettingTheme,
      setSettingTaskbarPosition,
      getSettingTaskbarPosition
    }
  },
  {
    persist: true
  }
)
