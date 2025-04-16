<template>
  <div class="p-4">
    <h1 class="text-center">文档目录</h1>
    <div class="flex items-center">
      <el-button plain :loading="loading" @click="openDirectoryFilesFn()">选择目录</el-button>
    </div>
    <div v-if="fileDirectoryParent.length > 0" class="flex h-[32px] flex-wrap items-center">
      <template v-for="(item, index) in fileDirectoryParent" :key="item.path">
        <el-icon v-if="index > 0" class="mx-2"><ArrowRight /></el-icon>
        <div
          class="flex h-[32px] cursor-pointer items-center"
          :class="{ 'text-gray-400': index === 0 || item.path === fileDirectory }"
          @click="goDirectoryParentFn(item.path, index)"
        >
          <el-image
            :src="`./icons/${defaultFolderIcon}`"
            alt="file"
            class="h-5 w-5 shrink-0"
          ></el-image>
          <div class="ml-2">{{ item.name }}</div>
        </div>
      </template>
    </div>
    <el-table
      v-loading="loading"
      :data="files"
      stripe
      highlight-current-row
      @row-dblclick="rowDblclickFn"
    >
      <el-table-column label="名称" prop="name" show-overflow-tooltip>
        <template #header>
          <div class="flex items-center">
            <div>名称</div>
            <div class="ml-2 flex-auto">
              <el-input
                v-model="fileNameSearch"
                v-on-key-stroke:Enter="doSearchFn"
                size="small"
                placeholder="输入名称，键盘回车搜索"
              />
            </div>
          </div>
        </template>
        <template #default="{ row }">
          <div class="flex items-center">
            <el-image :src="`./icons/${row.icon}`" alt="file" class="h-5 w-5 shrink-0">
              <template #placeholder>
                <img
                  :src="`./icons/${row.isDirectory ? defaultFolderIcon : defaultFileIcon}`"
                  alt="file"
                  class="h-5 w-5"
                />
              </template>
              <template #error>
                <img
                  :src="`./icons/${row.isDirectory ? defaultFolderIcon : defaultFileIcon}`"
                  alt="file"
                  class="h-5 w-5"
                />
              </template>
            </el-image>
            <div class="ml-2">{{ row.name }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" prop="ctimeString" sortable width="200px"></el-table-column>
      <el-table-column label="大小" prop="size" sortable width="100px">
        <template #default="{ row }">{{
          row.isDirectory ? '' : sizeToHumanReadable(row.size)
        }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { getIconForFile, getIconForFolder } from 'vscode-icons-js'
import dayjs from 'dayjs'
import { ArrowRight } from '@element-plus/icons-vue'
import { vOnKeyStroke } from '@vueuse/components'

interface File {
  name: string
  path: string
  isDirectory: boolean
  size: number
  ctime: Date
}
interface FileInfo extends File {
  icon: string
  ctimeString: string
}

const defaultFileIcon = ref<string>(getIconForFile('default') as string)
const defaultFolderIcon = ref<string>(getIconForFolder('default') as string)

const fileDirectory = ref<string>('')
const files = ref<FileInfo[]>([])
const filesOld = ref<FileInfo[]>([])
const fileNameSearch = ref<string>('')
const loading = ref(false)
const openDirectoryFilesFn = async (path: string = '') => {
  loading.value = true
  const res: File[] = await window.electron.ipcRenderer.invoke('openDirectoryFiles', path)
  loading.value = false
  files.value = res.map((item) => {
    return {
      ...item,
      icon: item.isDirectory
        ? (getIconForFolder(getFileType(item.name)) ?? defaultFolderIcon.value)
        : (getIconForFile(getFileType(item.name)) ?? defaultFileIcon.value),
      ctimeString: dayjs(item.ctime).format('YYYY-MM-DD HH:mm:ss')
    }
  })
  filesOld.value = files.value
  if (!path) {
    fileDirectory.value = res[0].path.split('\\').slice(0, -1).join('\\')
  }
}
interface DirectoryParent {
  name: string
  path: string
}
const fileDirectoryParent = computed(() => {
  if (fileDirectory.value) {
    const list = fileDirectory.value.split('\\')
    const parents: DirectoryParent[] = []
    for (let i = 0; i < list.length; i++) {
      parents.push({
        name: list[i],
        path: list.slice(0, i + 1).join('\\')
      })
    }
    return parents
  } else {
    return []
  }
})
const doSearchFn = () => {
  console.log(fileNameSearch.value)
  if (fileNameSearch.value) {
    files.value = filesOld.value.filter((item) => {
      return item.name.includes(fileNameSearch.value)
    })
  } else {
    files.value = filesOld.value
  }
}
const rowDblclickFn = (row: FileInfo) => {
  if (row.isDirectory) {
    fileDirectory.value = row.path
    openDirectoryFilesFn(row.path)
  } else {
    console.log(row)
  }
}
const goDirectoryParentFn = (path: string, index: number) => {
  if (index > 0 && path !== fileDirectory.value) {
    fileDirectory.value = path
    openDirectoryFilesFn(path)
  }
}

const getFileType = (name: string) => {
  return name.split('.').pop() || 'default'
}

function sizeToHumanReadable(size: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024
    i++
  }
  return `${Math.round(size)}${units[i]}`
}
</script>
