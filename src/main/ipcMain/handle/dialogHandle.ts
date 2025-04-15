import { dialog } from 'electron'
import { opendir } from 'node:fs/promises'
import { join } from 'node:path'

interface File {
  name: string
  path: string
  isDirectory: boolean
}

export async function showOpenDialogAndDirectory() {
  const paths = await dialog.showOpenDialog({
    title: '选择文档目录',
    properties: ['openDirectory']
  })
  if (paths.canceled) {
    return []
  }
  const directoryPath = paths.filePaths[0]
  const dir = await opendir(directoryPath)
  const files: File[] = []
  for await (const dirent of dir) {
    files.push({
      name: dirent.name,
      path: join(directoryPath, dirent.name),
      isDirectory: dirent.isDirectory()
    })
  }
  return files
}
