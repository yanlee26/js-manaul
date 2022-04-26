import { ButtonType } from 'antd/lib/button'
import { ReactNode } from 'react'

export interface BaseItem {
  id: number
  text: string | ReactNode
  icon?: ReactNode
  type?: ButtonType
  loading?: boolean
  disabled?: boolean
  hidden?: boolean
  danger?: boolean
  onClick?(): void
}
