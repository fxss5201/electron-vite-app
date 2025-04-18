<template>
  <el-image :src="`./icons/${fileIcon}`" alt="file" class="shrink-0" :style="styles">
    <template #placeholder>
      <img
        :src="`./icons/${isDirectory ? defaultFolderIcon : defaultFileIcon}`"
        alt="file"
        :style="styles"
      />
    </template>
    <template #error>
      <img
        :src="`./icons/${isDirectory ? defaultFolderIcon : defaultFileIcon}`"
        alt="file"
        :style="styles"
      />
    </template>
  </el-image>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getIconForFile, getIconForFolder, getIconForOpenFolder } from 'vscode-icons-js'

interface Props {
  name: string
  size?: number
  isDirectory?: boolean
  isOpen?: boolean
}
const { name, size = 20, isDirectory = false, isOpen = false } = defineProps<Props>()

const defaultFileIcon = ref<string>(getIconForFile('default') as string)
const defaultFolderIcon = ref<string>(getIconForFolder('default') as string)
const defaultOpenFolderIcon = ref<string>(getIconForOpenFolder('default') as string)

const getFileType = (name: string) => {
  return name.split('.').pop() || 'default'
}

const fileIcon = computed(() => {
  return isDirectory
    ? isOpen
      ? (getIconForOpenFolder(getFileType(name)) ?? defaultOpenFolderIcon.value)
      : (getIconForFolder(getFileType(name)) ?? defaultFolderIcon.value)
    : (getIconForFile(getFileType(name)) ?? defaultFileIcon.value)
})
const styles = computed(() => {
  return {
    width: `${size}px`,
    height: `${size}px`
  }
})
</script>
