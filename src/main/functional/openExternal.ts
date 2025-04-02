import { shell } from 'electron'

export function openExternal(url: string) {
  shell.openExternal(url)
}
