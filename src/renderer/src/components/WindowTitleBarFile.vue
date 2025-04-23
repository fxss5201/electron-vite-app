<template>
  <WindowTitleBar :always-on-top-able="true">
    <FileIcon :name="file.name" :size="20" />
    <div class="ml-1 truncate text-base">{{ file.name }}</div>
  </WindowTitleBar>
</template>

<script setup lang="ts">
import WindowTitleBar from '@renderer/components/WindowTitleBar.vue'
import FileIcon from '@renderer/components/FileIcon.vue'
import type { BaseFile } from '@renderer/types/fileType'

interface Props {
  file: BaseFile
}
const { file } = defineProps<Props>()
</script>
