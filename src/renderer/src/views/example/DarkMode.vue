<template>
  <div class="text-center">
    <h1>Dark Mode</h1>
    <div class="p-[18px]">
      <el-select v-model="theme" @change="changeThemeFn">
        <el-option label="跟随系统" value="system" />
        <el-option label="浅色模式" value="light" />
        <el-option label="暗黑模式" value="dark" />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDark } from '@vueuse/core'

const theme = ref('system')

onMounted(async () => {
  const res = await window.electron.ipcRenderer.invoke('getThemeMode')
  if (res) {
    theme.value = res
  }
})

const changeThemeFn = async (val) => {
  const res = await window.electron.ipcRenderer.invoke('setThemeMode', val)
  if (res) {
    useDark()
  }
}
</script>
