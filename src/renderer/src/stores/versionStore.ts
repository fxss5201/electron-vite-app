import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { versionType } from '@renderer/types/versionType'

export const useVersionStore = defineStore(
  'versionStore',
  () => {
    const versionInfo = ref<versionType>()

    function setVersionInfo(obj: versionType) {
      versionInfo.value = obj
    }

    return { versionInfo, setVersionInfo }
  },
  {
    persist: true
  }
)
