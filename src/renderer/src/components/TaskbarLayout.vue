<template>
  <div
    :class="layoutWrapClass"
    class="flex h-screen w-screen items-stretch justify-stretch overflow-hidden"
    @contextmenu="onContextMenu($event)"
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
import ContextMenu from '@imengyu/vue3-context-menu'
import type { TaskbarPositionType } from '@renderer/types/layout'

interface Props {
  taskbarPosition?: TaskbarPositionType
  taskbarSize?: number
  contextMenu?: boolean
}

const { taskbarPosition = 'left', taskbarSize = 60, contextMenu = true } = defineProps<Props>()

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

const menus = computed(() => {
  return [
    {
      label: '任务栏位置',
      // 是否应为没有图标的菜单项保留固定宽度的图标区域
      preserveIconWidth: false,
      children: [
        {
          label: '底部',
          checked: taskbarPosition === 'bottom',
          onClick: () => {
            changeTaskbarPosition('bottom')
          }
        },
        {
          label: '左侧',
          checked: taskbarPosition === 'left',
          onClick: () => {
            changeTaskbarPosition('left')
          }
        },
        {
          label: '右侧',
          checked: taskbarPosition === 'right',
          onClick: () => {
            changeTaskbarPosition('right')
          }
        },
        {
          label: '顶部',
          checked: taskbarPosition === 'top',
          onClick: () => {
            changeTaskbarPosition('top')
          }
        }
      ]
    }
  ]
})
const onContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  if (!contextMenu) return
  ContextMenu.showContextMenu({
    x: e.clientX,
    y: e.clientY,
    items: menus.value
  })
}
const emit = defineEmits<{
  getTaskbarPosition: []
}>()
const changeTaskbarPosition = async (position: TaskbarPositionType) => {
  await window.electron.ipcRenderer.invoke('setTaskbarPosition', position)
  emit('getTaskbarPosition')
}
</script>
