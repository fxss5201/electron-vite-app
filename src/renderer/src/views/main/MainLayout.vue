<template>
  <TaskbarLayout :taskbar-position="taskbarPosition" @get-taskbar-position="getTaskbarPositionFn">
    <template #taskbar>
      <div class="h-full w-full bg-gray-800 text-white">任务栏</div>
    </template>
  </TaskbarLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TaskbarLayout from '@renderer/components/TaskbarLayout.vue'
import type { TaskbarPositionType } from '@renderer/types/layout'

const taskbarPosition = ref<TaskbarPositionType>('left')
const getTaskbarPositionFn = async () => {
  taskbarPosition.value = (await window.electron.ipcRenderer.invoke(
    'getTaskbarPosition'
  )) as unknown as TaskbarPositionType
}
onMounted(() => {
  getTaskbarPositionFn()
})
</script>
