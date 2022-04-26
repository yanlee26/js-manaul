import { Form } from 'antd'
import { FormItemProps } from 'antd/lib/form'
import React, { ReactNode } from 'react'

export interface DictItem {
  code: string
  value: string
}

type FormItemListProps = Array<DictItem & { name?: string }>

export function FormItemList(options: FormItemListProps = []) {
  return options.map(({ code, value }) => (
    <Form.Item key={code} label={code}>
      {value}
    </Form.Item>
  ))
}

interface FormItemStyleProps extends FormItemProps {
  label?: string
  children: ReactNode
  required?: boolean
}

export function FormItemStyle({ label, children, required = false, ...rest }: FormItemStyleProps) {
  return (
    <Form.Item label={label} required={required} {...rest}>
      {children}
    </Form.Item>
  )
}
