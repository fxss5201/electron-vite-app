export interface BaseFile {
  name: string
  path: string
}

export interface BaseFileContent extends BaseFile {
  content?: string | Blob
}

export interface File extends BaseFile {
  isDirectory: boolean
  size: number
  ctime: Date
}

export interface FileInfo extends File {
  ctimeString: string
}
