<template>
  <TaskbarLayout :taskbar-position="setting.taskbarPosition">
    <template #taskbar>
      <TaskbarMenu />
    </template>
    <template #default>
      <router-view />
    </template>
  </TaskbarLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import TaskbarLayout from '@renderer/components/TaskbarLayout.vue'
import TaskbarMenu from '@renderer/components/TaskbarMenu.vue'
import { useSettingStore } from '@renderer/stores/settingStore'

const settingStore = useSettingStore()
const { setting } = storeToRefs(settingStore)
</script>
