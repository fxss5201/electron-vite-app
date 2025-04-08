<template>
  <div
    class="flex h-full w-full items-center bg-gray-700 leading-none text-white"
    :class="menuClass"
  >
    <div class="flex-auto"></div>
    <div class="shrink-0">
      <div class="cursor-pointer rounded-[6px] p-2 hover:bg-gray-500" @click="goSettingViewFn">
        <el-badge :is-dot="dotShow">
          <setting-two :size="18" />
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@renderer/stores/settingStore'
import { SettingTwo } from '@icon-park/vue-next'
import { useVersionStore } from '@renderer/stores/versionStore'

const router = useRouter()
const settingStore = useSettingStore()
const { setting } = storeToRefs(settingStore)

const menuClass = computed(() => {
  if (setting.value.taskbarPosition === 'top' || setting.value.taskbarPosition === 'bottom') {
    return 'flex-row px-3'
  } else {
    return 'flex-col py-3'
  }
})

function goSettingViewFn() {
  router.push({ name: 'SettingView', query: { tab: canUpdate.value ? '1' : '0' } })
}
const versionStore = useVersionStore()
const { versionInfo } = storeToRefs(versionStore)

const canUpdate = computed(() => {
  return versionInfo.value?.shouldUpdate ?? false
})
const dotShow = computed(() => {
  return canUpdate.value
})
</script>
