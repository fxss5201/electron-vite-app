import store from '../../stores'

export type TaskbarPositionType = 'top' | 'bottom' | 'left' | 'right'

export function setTaskbarPosition(_event: Electron.IpcMainInvokeEvent, val: TaskbarPositionType) {
  store.set('taskbarPosition', val)
}

export function getTaskbarPosition() {
  return (store.get('taskbarPosition') || 'left') as TaskbarPositionType
}
