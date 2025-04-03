<template>
  <div
    :class="layoutWrapClass"
    class="flex h-screen w-screen items-stretch justify-stretch overflow-hidden"
  >
    <div :style="taskbarSizeStyle" class="shrink-0">
      <slot name="taskbar" />
    </div>
    <div class="flex-auto">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type TaskbarPositionType = 'top' | 'bottom' | 'left' | 'right'
interface Props {
  taskbarPosition?: TaskbarPositionType
  taskbarSize?: number
}

const { taskbarPosition = 'left', taskbarSize = 60 } = defineProps<Props>()

const layoutWrapMap = {
  top: 'flex-col',
  bottom: 'flex-col-reverse',
  left: 'flex-row',
  right: 'flex-row-reverse'
}
const layoutWrapClass = computed(() => {
  return layoutWrapMap[taskbarPosition]
})
const taskbarSizeMap = {
  top: `height: ${taskbarSize}px`,
  bottom: `height: ${taskbarSize}px`,
  left: `width: ${taskbarSize}px`,
  right: `width: ${taskbarSize}px`
}
const taskbarSizeStyle = computed(() => {
  return taskbarSizeMap[taskbarPosition]
})
</script>
