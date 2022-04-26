import { ColProps } from 'antd/lib/col'

export const RESPONSIVE_FORM_ITEM_WRAPPER_COL: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6
}

export const FORM_ITEM_COL = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

export const DEFAULT_CUSTOM_FORM_ITEM = {
  colSpan: RESPONSIVE_FORM_ITEM_WRAPPER_COL,
  labelCol: FORM_ITEM_COL.labelCol,
  wrapperCol: FORM_ITEM_COL.wrapperCol
}
