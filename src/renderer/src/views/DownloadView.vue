<template>
  <div class="flex h-screen items-center justify-center">
    <el-progress type="dashboard" :percentage="percent">
      <template #default="{ percentage }">
        <div class="mt-[10px] text-[28px]">{{ progressFormat(percentage) }}%</div>
        <div class="mt-[10px] text-[12px]">下载中...</div>
      </template>
    </el-progress>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const percent = ref(0)

onMounted(() => {
  window.electron.ipcRenderer.on('downloadProgress', (_event, percentVal: number) => {
    percent.value = percentVal
  })
})
onUnmounted(() => {
  window.electron.ipcRenderer.removeAllListeners('downloadProgress')
})

function progressFormat(val: number) {
  return val.toFixed(2)
}
</script>
