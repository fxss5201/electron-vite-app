<template>
  <div class="page-box">
    <h1>FlashTray</h1>
    <el-button plain @click="startFlashTrayFn">开始闪烁（8秒自动停止）</el-button>
    <el-button plain @click="startFlashTrayNoStopFn">开始闪烁（永不停止）</el-button>
    <el-button plain @click="stopFlashTrayFn">关闭闪烁</el-button>
  </div>
</template>

<script setup lang="ts">
function startFlashTrayFn() {
  window.electron.ipcRenderer.send('startFlashTray')
}

function startFlashTrayNoStopFn() {
  window.electron.ipcRenderer.send('startFlashTray', 0) 
}

function stopFlashTrayFn() {
  window.electron.ipcRenderer.send('stopFlashTray') 
}
</script>

<style lang="scss" scoped>
</style>
