<template>
  <div class="page-box">
    <h1>progress-bar</h1>
    <p>任务栏图标上的进度条</p>
    <el-button plain @click="startProgressBarFn">开始</el-button>
    <el-button plain @click="pauseProgressBarFn">暂停</el-button>
    <el-button plain @click="resumeProgressBarFn">继续</el-button>
    <el-button plain @click="resetProgressBarFn">重置</el-button>
  </div>
</template>

<script setup lang="ts">
function startProgressBarFn() {
  window.electron.ipcRenderer.send('startProgressBar')
}

function pauseProgressBarFn() {
  window.electron.ipcRenderer.send('pauseProgressBar')
}

function resumeProgressBarFn() {
  window.electron.ipcRenderer.send('resumeProgressBar') 
}

function resetProgressBarFn() {
  window.electron.ipcRenderer.send('resetProgressBar') 
}
</script>

<style lang="scss" scoped>
</style>
