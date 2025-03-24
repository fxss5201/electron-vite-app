<template>
  <div class="page-box">
    <h1>Dark Mode</h1>
    <el-button plain @click="setDarkMode">暗黑模式</el-button>
    <el-button plain @click="toggleDark()">切换模式</el-button>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { watch } from 'vue';

const isDark = useDark();

const setDarkMode = () => {
  isDark.value = true; 
}
const toggleDark = useToggle(isDark);

watch(
  () => isDark.value,
  async (val) => {
    window.electron.ipcRenderer.send('setDarkMode', val);
  }
)
</script>

<style lang="scss" scoped>
</style>
