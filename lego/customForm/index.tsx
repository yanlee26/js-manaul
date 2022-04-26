import { Cascader, Checkbox, Col, DatePicker, Input, Radio, Select, TreeSelect } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import moment from 'moment'
import React from 'react'
import { FORM_ITEM_COL, RESPONSIVE_FORM_ITEM_WRAPPER_COL } from './constant'
import { InputNumberPicker } from './inputNumberPicker'
import {
  CustomFormItemCascaderInputProps,
  CustomFormItemCheckboxInputProps,
  CustomFormItemInputProps,
  CustomFormItemNumberRangeInputProps,
  CustomFormItemProps,
  CustomFormItemRadioInputProps,
  CustomFormItemRangePickerDateProps,
  CustomFormItemSelectInputProps,
  CustomFormItemTextAreaInputProps,
  CustomFormItemTreeSelectInputProps,
  CustomFormPickerDateProps
} from './interface'
import { ruleCommonInput, ruleCommonSelect, ruleNumberPicker } from './rule'

const CustomFormItem = ({
  FormItem,
  name,
  rules,
  customLabel,
  initialValue,
  labelCol = FORM_ITEM_COL.labelCol,
  wrapperCol = FORM_ITEM_COL.wrapperCol,
  colSpan = RESPONSIVE_FORM_ITEM_WRAPPER_COL,
  responsive = true,
  children
}: CustomFormItemProps) => {
  const rawItem = (
    <FormItem
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      name={name}
      label={customLabel}
      initialValue={initialValue}
      rules={rules}
    >
      {children}
    </FormItem>
  )
  return responsive ? <Col {...colSpan}>{rawItem}</Col> : rawItem
}

const TextInput = ({
  onChange,
  placeholder = '请输入',
  disabled = false,
  maxLength = 20,
  allowClear = true,
  ...formItemProps
}: CustomFormItemInputProps) => {
  const { rules, customLabel, required = false, ...props } = formItemProps
  return (
    <CustomFormItem
      {...props}
      customLabel={customLabel}
      rules={rules || ruleCommonInput({ text: customLabel || '', required })}
    >
      <Input
        allowClear={allowClear}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={onChange}
      />
    </CustomFormItem>
  )
}

const TextAreaInput = ({
  onChange,
  placeholder = '请输入',
  disabled = false,
  maxLength = 200,
  allowClear = true,
  showCount = true,
  ...formItemProps
}: CustomFormItemTextAreaInputProps) => {
  const { rules, customLabel, required = false, ...props } = formItemProps
  return (
    <CustomFormItem
      {...props}
      customLabel={customLabel}
      rules={rules || ruleCommonInput({ text: customLabel || '', required })}
    >
      <Input.TextArea
        allowClear={allowClear}
        showCount={showCount}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        onChange={onChange}
      />
    </CustomFormItem>
  )
}

const RadioInput = ({
  optionList = [],
  disabled,
  onChange,
  initialValue,
  ...formItemProps
}: CustomFormItemRadioInputProps) => {
  const { rules, customLabel, required = false, ...props } = formItemProps
  const options = optionList.map(({ code: value, value: label }) => ({
    label,
    value
  }))
  return (
    <CustomFormItem
      {...props}
      customLabel={customLabel}
      initialValue={initialValue}
      rules={rules || ruleCommonSelect({ text: customLabel || '', required })}
    >
      <Radio.Group options={options} onChange={onChange} />
    </CustomFormItem>
  )
}

const CheckboxInput = ({ optionList = [], disabled, onChange, ...formItemProps }: CustomFormItemCheckboxInputProps) => {
  const { rules, customLabel, required = false, ...props } = formItemProps
  const options = optionList.map(({ code: value, value: label, disabled: dis = false }) => ({
    label,
    value,
    disabled: dis
  }))
  return (
    <CustomFormItem
      {...props}
      customLabel={customLabel}
      rules={rules || ruleCommonSelect({ text: customLabel || '', required })}
    >
      <Checkbox.Group options={options} onChange={onChange} disabled={disabled} />
    </CustomFormItem>
  )
}

const SelectInput = ({
  mode,
  hasAll = false,
  placeholder = '请选择',
  options = [],
  disabled = false,
  allowClear = true,
  onSelect,
  ...formItemProps
}: CustomFormItemSelectInputProps) => {
  const { rules, customLabel, required = false, ...props } = formItemProps
  return (
    <CustomFormItem
      {...props}
      customLabel={customLabel}
      rules={rules || ruleCommonSelect({ text: customLabel || '', required })}
    >
      <Select allowClear={allowClear} disabled={disabled} mode={mode} placeholder={placeholder} onSelect={onSelect}>
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
    </CustomFormItem>
  )
}

const DataRangePickerInput = ({
  showTime = false,
  ranges,
  allowClear = true,
  disabledDate,
  onChange,
  hasLabel = true,
  formatDate,
  formatTime = 'HH:mm',
  disabled = false,
  ...formItemProps
}: CustomFormItemRangePickerDateProps) => {
  const { rules, customLabel, required = false, initialValue, ...props } = formItemProps
  return (
    <CustomFormItem
      {...props}
      customLabel={customLabel}
      rules={rules || ruleCommonSelect({ text: customLabel || '', required })}
      initialValue={
        initialValue && [
          moment(initialValue.start, showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'),
          moment(initialValue.end, showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
        ]
      }
    >
      <DatePicker.RangePicker
        allowClear={allowClear}
        locale={locale}
        style={{ width: '100%' }}
        ranges={ranges}
        format={formatDate || showTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'}
        showTime={showTime && { format: 'HH:mm' }}
        disabledDate={disabledDate}
        disabled={disabled}
        onChange={onChange}
      />
    </CustomFormItem>
  )
}

const DataPickerInput = ({
  showTime = true,
  allowClear = true,
  disabledDate,
  onChange,
  hasLabel = true,
  formatDate,
  formatTime = 'HH:mm',
  disabled = false,
  showNow = true,
  ...formItemProps
}: CustomFormPickerDateProps) => {
  const { rules, customLabel, required = false, initialValue, ...props } = formItemProps
  return (
    <CustomFormItem
      {...props}
      customLabel={customLabel}
      rules={rules || ruleCommonSelect({ text: customLabel || '', required })}
      initialValue={initialValue ? moment(initialValue, showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD') : undefined}
    >
      <DatePicker
        allowClear={allowClear}
        locale={locale}
        style={{ width: '100%' }}
        format={formatDate || showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
        showNow={showNow}
        showTime={showTime && { format: formatTime }}
        disabledDate={disabledDate}
        disabled={disabled as boolean}
        onChange={onChange}
      />
    </CustomFormItem>
  )
}

const TreeSelectInput = ({
  placeholder = '请选择',
  disabled = false,
  optionList = [],
  allowClear = true,
  onClear,
  onSelect,
  ...formItemProps
}: CustomFormItemTreeSelectInputProps) => {
  const { rules, customLabel, required = false, ...props } = formItemProps
  return (
    <CustomFormItem
      {...props}
      customLabel={customLabel}
      rules={rules || ruleCommonSelect({ text: customLabel || '', required })}
    >
      <TreeSelect
        allowClear={allowClear}
        placeholder={placeholder}
        treeData={optionList}
        onClear={onClear}
        onSelect={onSelect}
        disabled={disabled}
      />
    </CustomFormItem>
  )
}

const CascadeInput = ({
  placeholder = '请选择',
  optionList = [],
  disabled = false,
  allowClear = true,
  onChange,
  displayRender,
  ...formItemProps
}: CustomFormItemCascaderInputProps) => {
  const { rules, customLabel, required = false, ...props } = formItemProps
  return (
    <CustomFormItem
      {...props}
      customLabel={customLabel}
      rules={rules || ruleCommonSelect({ text: customLabel || '', required })}
    >
      <Cascader
        options={optionList}
        placeholder={placeholder}
        allowClear={allowClear}
        disabled={disabled}
        onChange={onChange}
        displayRender={displayRender}
      />
    </CustomFormItem>
  )
}

const NumberRangeInput = ({
  initialValue,
  placeholder = '请选择',
  disabled = false,
  minLength = 0,
  onChange,
  ...formItemProps
}: CustomFormItemNumberRangeInputProps) => {
  const { rules, customLabel, required = false, ...props } = formItemProps
  return (
    <CustomFormItem
      {...props}
      initialValue
      customLabel={customLabel}
      rules={rules || ruleNumberPicker({ text: customLabel || '', required })}
    >
      <InputNumberPicker
        defaultValue={initialValue}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        min={minLength}
      />
    </CustomFormItem>
  )
}

export {
  CustomFormItem,
  TextInput,
  TextAreaInput,
  RadioInput,
  CheckboxInput,
  SelectInput,
  DataPickerInput,
  DataRangePickerInput,
  TreeSelectInput,
  CascadeInput,
  NumberRangeInput
}
