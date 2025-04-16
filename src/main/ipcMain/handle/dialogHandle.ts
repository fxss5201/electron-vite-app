import { dialog } from 'electron'
import { opendir, stat } from 'node:fs/promises'
import { join } from 'node:path'

interface File {
  name: string
  path: string
  isDirectory: boolean
  size: number
  ctime: Date
}

export async function openDirectoryFiles(_event: Electron.IpcMainInvokeEvent, path: string) {
  let directoryPath: string
  if (!path) {
    const paths = await dialog.showOpenDialog({
      title: '选择文档目录',
      properties: ['openDirectory']
    })
    if (paths.canceled) {
      return []
    }
    directoryPath = paths.filePaths[0]
  } else {
    directoryPath = join(path)
  }
  try {
    const dir = await opendir(directoryPath)
    const files: File[] = []
    for await (const dirent of dir) {
      const filePath = join(directoryPath, dirent.name)
      const fileStat = await stat(filePath)
      files.push({
        name: dirent.name,
        path: filePath,
        isDirectory: dirent.isDirectory(),
        size: fileStat.size,
        ctime: fileStat.ctime
      })
    }
    return files.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) {
        return -1
      } else if (!a.isDirectory && b.isDirectory) {
        return 1
      } else {
        return a.name.localeCompare(b.name)
      }
    })
  } catch (error) {
    console.error('Error reading directory:', error)
    return []
  }
}
