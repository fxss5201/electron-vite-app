<template>
  <div class="p-4">
    <h1 class="text-center">文档目录</h1>
    <div class="flex items-center">
      <el-button plain @click="doSelectDirectory">选择目录</el-button>
    </div>
    <div class="mt-3">
      <div
        v-for="item in files"
        :key="item.name"
        class="flex items-center truncate px-2 py-1 hover:cursor-pointer hover:bg-gray-200"
      >
        <el-image :src="`./icons/${item.icon}`" alt="file" class="h-5 w-5 shrink-0">
          <template #placeholder>
            <img
              :src="`./icons/${item.isDirectory ? defaultFolderIcon : defaultFileIcon}`"
              alt="file"
              class="h-5 w-5"
            />
          </template>
          <template #error>
            <img
              :src="`./icons/${item.isDirectory ? defaultFolderIcon : defaultFileIcon}`"
              alt="file"
              class="h-5 w-5"
            />
          </template>
        </el-image>
        <div class="ml-2 truncate">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getIconForFile, getIconForFolder } from 'vscode-icons-js'

interface File {
  name: string
  path: string
  isDirectory: boolean
}
interface FileInfo extends File {
  icon: string
}

const defaultFileIcon = ref<string>(getIconForFile('default') as string)
const defaultFolderIcon = ref<string>(getIconForFolder('default') as string)

const files = ref<FileInfo[]>([])
const doSelectDirectory = async () => {
  const res: File[] = await window.electron.ipcRenderer.invoke('showOpenDialogAndDirectory')
  files.value = res.map((item) => {
    return {
      ...item,
      icon: item.isDirectory
        ? (getIconForFolder(getFileType(item.name)) ?? defaultFolderIcon.value)
        : (getIconForFile(getFileType(item.name)) ?? defaultFileIcon.value)
    }
  })
}

const getFileType = (name: string) => {
  return name.split('.').pop() || 'default'
}
</script>
