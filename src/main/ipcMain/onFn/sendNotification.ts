import { Notification, nativeImage } from 'electron'
import iconPath from '../../../../resources/icons/256x256.png?asset'

type NotificationForm = {
  title: string
  body: string
  icon?: string
}
export function sendNotification(_event: Electron.IpcMainEvent, form: NotificationForm) {
  const icon = nativeImage.createFromPath(iconPath)
  new Notification({
    title: form.title,
    body: form.body,
    icon
  }).show()
}
