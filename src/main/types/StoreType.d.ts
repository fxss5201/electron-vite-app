export interface StoreType {
  user: {
    account: string
    password: string
  }
  theme?: 'system' | 'light' | 'dark'
}
