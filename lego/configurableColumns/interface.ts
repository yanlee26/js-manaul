import { ColumnType } from 'antd/lib/table'

export type ConfigurableColumnType<T> = ColumnType<T> & {
  defaultShow?: boolean
  checkShow?: boolean
}

export type ConfigurableColumnGroupType<T> = ConfigurableColumnType<T> & {
  children: ConfigurableColumnsType<T>
}

export type ConfigurableColumnsType<T> = (ConfigurableColumnGroupType<T> | ConfigurableColumnType<T>)[]
