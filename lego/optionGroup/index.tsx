import { DictItem, DictItems } from '@keukenhof/interface'
import { Checkbox, Radio, Select } from 'antd'
import React from 'react'

interface OptionProps {
  options: Map<number | boolean, string>
  placeholder?: string
  hasAll?: boolean
  defaultValue?: undefined | string | number
  onChange?: (o?: any) => void
}

export function GenRadioGroup({ options }: OptionProps) {
  return (
    <Radio.Group>
      {[...options.entries()].map(([k, v]) => {
        return (
          <Radio key={k as number} value={k}>
            {v}
          </Radio>
        )
      })}
    </Radio.Group>
  )
}

interface CheckboxGroupProps {
  options: DictItems
  placeholder?: string
  hasAll?: boolean
  defaultValue?: undefined | string | number
}
export function GenCheckboxGroup({ options }: CheckboxGroupProps) {
  const optionsConverted = options.map(({ code: value, value: label }) => ({
    label,
    value
  }))
  return <Checkbox.Group defaultValue={[]} options={optionsConverted}></Checkbox.Group>
}

export function GenSelectGroup({ options, placeholder, hasAll = false, defaultValue, onChange }: OptionProps) {
  return (
    <Select placeholder={placeholder} defaultValue={defaultValue} onChange={onChange}>
      {hasAll && (
        <Select.Option key={'all'} value={''}>
          全部
        </Select.Option>
      )}
      {[...options.entries()].map(([k, v]) => {
        return (
          <Select.Option key={k as number} value={k as number}>
            {v}
          </Select.Option>
        )
      })}
    </Select>
  )
}

interface OptionArrayProps<T> extends Omit<OptionProps, 'options'> {
  options: Array<T>
  valueProp?: string
  disabled?: boolean
  mode?: 'multiple' | 'tags' | undefined
}

export function GenSelectGroupOfArray<T extends { id?: number; code?: string }>({
  options = [],
  placeholder,
  valueProp = 'roleName',
  mode,
  disabled = false,
  hasAll = false
}: OptionArrayProps<T>) {
  return (
    <Select mode={mode} disabled={disabled} placeholder={placeholder} defaultValue={hasAll ? '' : undefined}>
      {hasAll && (
        <Select.Option key={'all'} value={''}>
          全部
        </Select.Option>
      )}
      {options?.map(({ id, code, ...rest }) => {
        const key = id || code
        return (
          <Select.Option key={key} value={key!}>
            {/* @ts-ignore */}
            {rest[valueProp]}
          </Select.Option>
        )
      })}
    </Select>
  )
}

interface OptionDictProps extends OptionArrayProps<any> {
  options: Array<DictItem>
  disabled?: boolean
}
export function GenSelectGroupOfDict({
  options = [],
  placeholder,
  mode,
  hasAll = false,
  disabled = false,
  defaultValue
}: OptionDictProps) {
  return (
    <Select disabled={disabled} mode={mode} placeholder={placeholder} defaultValue={defaultValue}>
      {hasAll && (
        <Select.Option key={'all'} value={'all'}>
          全部
        </Select.Option>
      )}
      {options.map(({ code: key, value }) => {
        return (
          <Select.Option key={key} value={key}>
            {value}
          </Select.Option>
        )
      })}
    </Select>
  )
}
