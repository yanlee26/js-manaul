import { DictItem, DictItems } from '@keukenhof/interface'
import { CascaderProps, RadioGroupProps, SelectProps, TreeSelectProps } from 'antd'
import { CheckboxGroupProps } from 'antd/lib/checkbox'
import { ColProps } from 'antd/lib/col'
import { PickerDateProps, RangePickerDateProps } from 'antd/lib/date-picker/generatePicker'
import { FormItemProps } from 'antd/lib/form'
import { InputProps, TextAreaProps } from 'antd/lib/input'

export interface CustomFormItemProps extends Omit<FormItemProps, 'label'> {
  FormItem<Values = any>(props: FormItemProps<Values>): React.ReactElement
  required?: boolean
  customLabel?: string
  responsive?: boolean
  colSpan?: ColProps
  children?: React.ReactNode
}

export type CustomInputProps = Pick<InputProps, 'allowClear' | 'disabled' | 'maxLength' | 'placeholder' | 'onChange'>
export type CustomFormItemInputProps = CustomFormItemProps & CustomInputProps

export type CustomTextAreaInputProps = Pick<
  TextAreaProps,
  'allowClear' | 'disabled' | 'maxLength' | 'placeholder' | 'onChange' | 'showCount'
>
export type CustomFormItemTextAreaInputProps = CustomFormItemProps & CustomTextAreaInputProps

export type CustomRadioGroupInputProps = Pick<RadioGroupProps, 'disabled' | 'onChange'>
export type CustomFormItemRadioInputProps = CustomFormItemInputProps &
  CustomRadioGroupInputProps & { optionList: DictItems }

export type CustomCheckboxInputProps = Pick<CheckboxGroupProps, 'disabled' | 'onChange'>
export type CustomCheckboxInputOptionProps = DictItem & { disabled?: boolean }

export type CustomFormItemCheckboxInputProps = CustomFormItemProps &
  CustomCheckboxInputProps & { optionList: CustomCheckboxInputOptionProps[] }

export type CustomSelectInputProps = Pick<
  SelectProps<any>,
  'allowClear' | 'disabled' | 'mode' | 'placeholder' | 'onSelect'
>
export type CustomFormItemSelectInputProps = CustomFormItemProps &
  CustomSelectInputProps & { hasAll?: boolean; options?: any[] }

export type CustomRangePickerDateProps = Pick<
  RangePickerDateProps<any>,
  | 'allowClear'
  | 'disabled'
  | 'locale'
  | 'style'
  | 'disabledDate'
  | 'format'
  | 'showTime'
  | 'ranges'
  | 'onChange'
  | 'showNow'
>
export type CustomFormItemRangePickerDateProps = CustomFormItemProps &
  CustomRangePickerDateProps & {
    hasLabel?: boolean
    formatDate?: string
    formatTime?: string
  }

export type CustomFormPickerDateProps = CustomFormItemProps &
  PickerDateProps<any> & {
    hasLabel?: boolean
    formatDate?: string
    formatTime?: string
  }

export type CustomTreeSelectInputProps = Pick<
  TreeSelectProps<any>,
  'allowClear' | 'disabled' | 'placeholder' | 'onSelect' | 'onClear'
>
export type CustomFormItemTreeSelectInputProps = CustomFormItemProps & CustomTreeSelectInputProps & { optionList: any }

export type CustomCascaderInputProps = Pick<
  CascaderProps,
  'allowClear' | 'disabled' | 'placeholder' | 'onChange' | 'displayRender'
>
export type CustomFormItemCascaderInputProps = CustomFormItemProps & CustomCascaderInputProps & { optionList: any }
export type CustomFormItemNumberRangeInputProps = CustomFormItemProps &
  Pick<InputProps, 'disabled' | 'maxLength' | 'placeholder' | 'value' | 'defaultValue' | 'minLength'> & {
    isRemoveDecimal?: boolean
    onChange?(values?: [number, number]): void
  }
