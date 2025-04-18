import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { BaseFileContent } from '@renderer/types/fileType'

export const useWindowFileStore = defineStore('windowFileStore', () => {
  const file = ref<BaseFileContent>({
    name: '',
    path: '',
    content: ''
  })
  const fileList = ref<BaseFileContent[]>([])

  function setFile(list: BaseFileContent) {
    file.value = list
  }
  function setFileList(list: BaseFileContent[]) {
    fileList.value = list
  }

  return { file, fileList, setFile, setFileList }
})
