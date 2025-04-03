export type ThemeType = 'system' | 'light' | 'dark'
export type TaskbarPositionType = 'top' | 'bottom' | 'left' | 'right'

export interface StoreType {
  user: {
    account: string
    password: string
  }
  theme?: ThemeType
  mainWindowBounds?: {
    x: number
    y: number
    width: number
    height: number
  }
  mainWindowIsMaximized?: boolean // 是否最大化，优先级高于 mainWindowBounds
  taskbarPosition: TaskbarPositionType
}
