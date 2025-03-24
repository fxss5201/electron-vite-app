<template>
  <div class="page-box">
    <h1>FlashFrame</h1>
    <el-button plain @click="startFlashFrameFn">开始闪烁</el-button>
    <el-button plain @click="stopFlashFrameFn">关闭闪烁</el-button>
  </div>
</template>

<script setup lang="ts">
function startFlashFrameFn() {
  window.electron.ipcRenderer.send('startFlashFrame')
}

function stopFlashFrameFn() {
  window.electron.ipcRenderer.send('stopFlashFrame') 
}
</script>

<style lang="scss" scoped>
</style>
