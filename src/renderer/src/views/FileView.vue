<template>
  <WindowTitleBarFile :file="file!"></WindowTitleBarFile>
  <div class="relative h-[calc(100vh-28px)]">
    <div class="window-file-button left-4" @click="goPrevFn">
      <el-icon :size="18"><ArrowLeftBold /></el-icon>
    </div>
    <div class="window-file-button right-4" @click="goNextFn">
      <el-icon :size="18"><ArrowRightBold /></el-icon>
    </div>
    <!-- eslint-disable-next-line prettier/prettier -->
    <MonacoEditorCard v-if="isCode" v-model="(file.content! as string)" :lang="lang"></MonacoEditorCard>
    <div v-else-if="isImg" class="flex h-full items-center justify-center">
      <el-image
        style="max-width: 100%"
        :src="file.content"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="[file.content]"
        :initial-index="0"
        :infinite="false"
        fit="cover"
        preview-teleported
        :z-index="99999"
      />
    </div>
    <div v-else-if="isVideo" class="flex h-full items-center justify-center">
      <!-- eslint-disable-next-line prettier/prettier -->
      <video controls autoplay style="max-width: 100%" :src="(file.content! as string)"></video>
    </div>
    <!-- <OfficeFileCard v-else-if="isOffice" :file-type="fileType!" :file-path="(file.content! as Blob)"></OfficeFileCard> -->
    <div v-else-if="isOffice" class="flex h-full items-center justify-center">
      <div>Office文件已使用系统默认程序打开</div>
    </div>
    <div v-else class="flex h-full items-center justify-center">
      <div>暂不支持预览文件类型：{{ fileType }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useWindowFileStore } from '@renderer/stores/windowFileStore'
import WindowTitleBarFile from '@renderer/components/WindowTitleBarFile.vue'
import MonacoEditorCard from '@renderer/components/MonacoEditorCard.vue'
// import OfficeFileCard from '@renderer/components/OfficeFileCard.vue'
import {
  imgFileTypeList,
  allCodeFileTypeList,
  officeFileTypeList,
  videoFileTypeList
} from '@renderer/components/fileConfig'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'

const windowFileStore = useWindowFileStore()
const { file, fileList } = storeToRefs(windowFileStore)
const { setFile, setFileList } = windowFileStore

const fileIndex = ref<number>(0)
watch(
  () => file.value,
  () => {
    fileIndex.value = fileList.value.findIndex((item) => {
      return item.path === file.value!.path
    })
  },
  {
    deep: true,
    immediate: true
  }
)

const fileType = computed(() => {
  return getFileType(file.value!.name)
})

const lang = computed(() => {
  return fileType.value || 'javascript'
})

const isImg = computed(() => {
  return imgFileTypeList.includes(fileType.value!)
})
const isCode = computed(() => {
  return allCodeFileTypeList.includes(fileType.value!)
})
const isOffice = computed(() => {
  return officeFileTypeList.includes(fileType.value!)
})
const isVideo = computed(() => {
  return videoFileTypeList.includes(fileType.value!)
})

const loading = ref(false)
const goPrevFn = async () => {
  if (fileIndex.value === 0) {
    fileIndex.value = fileList.value.length - 1
  } else {
    fileIndex.value -= 1
  }
  await readFileFn()
}

const goNextFn = async () => {
  if (fileIndex.value === fileList.value.length - 1) {
    fileIndex.value = 0
  } else {
    fileIndex.value += 1
  }
  await readFileFn()
}

async function readFileFn() {
  let curFile = fileList.value[fileIndex.value]
  if (!curFile.content) {
    loading.value = true
    const fileContent = await window.electron.ipcRenderer.invoke('openFileContent', curFile.path)
    loading.value = false
    curFile = { ...curFile, content: fileContent }
  }
  setFile(curFile)
  setFileList([
    ...fileList.value.slice(0, fileIndex.value),
    curFile,
    ...fileList.value.slice(fileIndex.value + 1)
  ])
}

function getFileType(path: string) {
  return path.split('.').pop()
}
</script>
