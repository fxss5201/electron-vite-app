import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import { shell } from 'electron'
import {
  allCodeFileTypeList,
  officeFileTypeList,
  imgFileTypeList,
  videoFileTypeList
} from './fileConfig'

function getFileType(path: string) {
  return path.split('.').pop()
}

export function readFile(filePath: string) {
  const path = join(filePath)
  if (allCodeFileTypeList.includes(getFileType(filePath)!)) {
    const fileRead = readFileSync(path, { encoding: 'utf-8' })
    return fileRead
  } else if (
    imgFileTypeList.includes(getFileType(filePath)!) ||
    videoFileTypeList.includes(getFileType(filePath)!)
  ) {
    return `file:///${path
      .split('\\')
      .map((x) => encodeURI(x))
      .join('/')}`
  } else if (officeFileTypeList.includes(getFileType(filePath)!)) {
    shell
      .openPath(`file:///${path}`)
      .then(() => {
        console.log('文件已使用系统默认程序打开')
      })
      .catch((err) => {
        console.error('打开文件失败:', err)
      })
    return ''
  }
  return ''
}
