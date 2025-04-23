<template>
  <div class="h-7" style="app-region: drag">
    <div
      class="fixed top-0 right-0 left-0 z-[999999] flex h-7 items-center justify-between truncate bg-gray-50 dark:bg-stone-950"
    >
      <div class="mx-2 flex h-7 items-center truncate">
        <slot></slot>
      </div>
      <div class="flex flex-none items-center">
        <div
          v-if="alwaysOnTopAble"
          class="window-title-bar-button"
          :class="alwaysOnTopClass"
          :title="isAlwaysOnTop ? '取消置顶' : '置顶'"
          @click="setAlwaysOnTopFn"
        >
          <Layers theme="outline" size="18" />
        </div>
        <div
          v-if="minimizeAble"
          class="window-title-bar-button"
          title="最小化"
          @click="doMinimizeFn"
        >
          <Minus theme="outline" size="18" />
        </div>
        <template v-if="maximizeAble">
          <div
            v-if="!isMaximized"
            class="window-title-bar-button"
            title="最大化"
            @click="doMaximizeFn"
          >
            <square-small theme="outline" size="18" />
          </div>
          <div v-else class="window-title-bar-button" title="向下还原" @click="doUnmaximizeFn">
            <Copy theme="outline" size="15" />
          </div>
        </template>
        <div v-if="closeAble" class="window-title-bar-button-close" title="关闭" @click="doCloseFn">
          <close-small theme="outline" size="18" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Layers, Minus, Copy, SquareSmall, CloseSmall } from '@icon-park/vue-next'

interface Props {
  alwaysOnTopAble?: boolean
  minimizeAble?: boolean
  maximizeAble?: boolean
  closeAble?: boolean
}
const {
  alwaysOnTopAble = false,
  minimizeAble = true,
  maximizeAble = true,
  closeAble = true
} = defineProps<Props>()

defineSlots<{
  default(): unknown
}>()

const isMaximized = ref(false)
onMounted(async () => {
  window.electron.ipcRenderer.once('isMaximized', (_event, val: boolean) => {
    isMaximized.value = val
  })
})

const doMinimizeFn = () => {
  window.electron.ipcRenderer.send('minimizeWindow')
}
const doMaximizeFn = () => {
  window.electron.ipcRenderer.send('maximizeWindow')
  isMaximized.value = true
}
const doUnmaximizeFn = () => {
  window.electron.ipcRenderer.send('unmaximizeWindow')
  isMaximized.value = false
}
const doCloseFn = () => {
  window.electron.ipcRenderer.send('closeWindow')
}

const isAlwaysOnTop = ref(false)
const alwaysOnTopClass = computed(() => {
  return isAlwaysOnTop.value ? 'bg-gray-200 text-blue-500 dark:bg-stone-700' : ''
})
const setAlwaysOnTopFn = () => {
  isAlwaysOnTop.value = !isAlwaysOnTop.value
  window.electron.ipcRenderer.send('setAlwaysOnTop', isAlwaysOnTop.value)
}
</script>
