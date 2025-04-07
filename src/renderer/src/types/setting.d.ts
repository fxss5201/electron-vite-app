export type TaskbarPositionType = 'top' | 'bottom' | 'left' | 'right'
export type ThemeType = 'system' | 'light' | 'dark'

export interface SettingType {
  theme: ThemeType
  taskbarPosition: TaskbarPositionType
}
