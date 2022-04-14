import {
  Button,
  Cascader,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
  Switch,
  TreeSelect
} from 'antd'
import { ColProps } from 'antd/lib/col'
import { FormProps, Rule } from 'antd/lib/form'
import { SearchOutlined } from 'components/only-icon'
import {
  GenCheckboxGroup,
  GenRadioGroup,
  GenSelectGroup,
  GenSelectGroupOfArray,
  GenSelectGroupOfDict
} from 'components/optionGroup'
import { SearchSelect, SearchSelectProps } from 'components/SearchSelect'
import { MAX_LENGTH, StaffStatusMap } from 'config'
import { TreeDataItem } from 'interface'
import { DictItems } from 'interface/dict'
import { RoleGetAllResult } from 'interface/permission/role'
import moment from 'moment'
import { IsBusinessMap, IsCloudDiskMap } from 'pages/internalAccount/dept/vm'
import { ClassStatusMap } from 'pages/product/vm'
import { TeacherStatusMap } from 'pages/teaching/teacher/vm'
import React, { ReactChild } from 'react'
import { FORMATWEEK, FORMATWEEK_WITH_HM } from 'utils'
import {
  ruleCommonSelect,
  ruleEmail,
  ruleLandline,
  ruleNonnegativeNumber,
  rulePadEnd2Number,
  ruleSpecialCharacters,
  ruleTelephone
} from 'utils/rules'

const { Option } = Select
const { RangePicker } = DatePicker

export interface UseBaseFrom {
  name: string
  required?: boolean
  layout?: { labelCol?: { span: number }; wrapperCol?: { span: number } }
  responsive?: boolean
  hasLabel?: boolean
  values?: {
    [x: string]: any
  }
}
export const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6
}
export const wrapperColSearchBtn: ColProps = {
  xs: 24,
  sm: 24,
  md: 16,
  lg: 16,
  xl: 24,
  xxl: 24
}
interface Props extends UseBaseFrom {
  // TODO:类型
  genFormItems: (responsive: boolean, required: boolean, hasLabel: boolean, form?: any) => any
}

export interface CustomFormItemProps {
  customName?: string
  formName?: string //一处多次使用，nameSpace
  children?: string | ReactChild
  mode?: 'multiple' | 'tags' | undefined
  hasAll?: boolean
  required?: boolean
  placeholder?: string
  hasLabel?: boolean
  allowClear?: boolean
  valueProp?: string
  optionList?: DictItems
  statusDescribeMap?: Map<number | boolean, string>
  defaultValue?: undefined | string | number
  initialValue?: any | any[]
  startTime?: string
  endTime?: string
  optionMap?: Map<number | boolean, string>
  rule?: Rule[] | undefined
  rest?: any
  innerHasLabel?: boolean
  disabled?: boolean
  multiple?: boolean
  maxLength?: number
  treeData?: Array<TreeDataItem>
  handleChange?: (value: any) => void
  text?: string
  disabledItems?: number[]
  disabledDate?(date: any): boolean
  format?: string
}

interface SelectInputProps {
  customName: string
  formName?: string //一处多次使用，nameSpace
  mode?: 'multiple' | 'tags' | undefined
  required?: boolean
  data: any[]
  value?: any[] | undefined
  fetching: boolean
  open?: boolean
  hasLabel?: boolean
  allowClear?: boolean
  handleSearch?: (value: any) => void
  handleChange?: (value: any[]) => void
  initialValue?: any[] | undefined
}

const defaultLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

function holderPlace(placeholder?: string, customName?: string, isSelect = false) {
  return placeholder || `请${isSelect ? '选择' : '输入'}${customName}`
}

export function useFrom({
  name = 'from',
  genFormItems,
  required = false,
  responsive = true,
  values = {},
  hasLabel = true,
  layout = defaultLayout
}: Props) {
  const [formInstance] = Form.useForm()
  const HookFormItems = genFormItems(responsive, required, hasLabel, formInstance)

  const _Form = ({ children, onValuesChange, ...props }: FormProps) => {
    return (
      <Form
        {...props}
        {...layout}
        form={formInstance}
        initialValues={values}
        name={name}
        autoComplete="off"
        onValuesChange={onValuesChange}
      >
        {responsive ? <Row>{children}</Row> : children}
      </Form>
    )
  }

  type InternalForm = typeof _Form
  interface Forms extends InternalForm {
    useForm(): [any]
    Item: typeof Form.Item
  }
  const FormWrapper: Forms = _Form as Forms
  FormWrapper.Item = Form.Item

  return {
    form: formInstance,
    Form: FormWrapper,
    ...HookFormItems
  }
}

export function genBaseFormItems(responsive = true, required = false, hasLabel = true, form: any) {
  function makeResponsive(item: ReactChild, wrapperColOptions: ColProps = wrapperCol) {
    return responsive ? <Col {...wrapperColOptions}>{item}</Col> : item
  }
  const Name = ({
    customName = '员工姓名',
    rule,
    formName = 'nickName',
    placeholder,
    initialValue,
    required: innerRequired,
    maxLength = MAX_LENGTH,
    ...rest
  }: CustomFormItemProps) => {
    const rules = rule || ruleSpecialCharacters({ text: customName, required: innerRequired ?? required })

    const rawItem = (
      <Form.Item
        name={formName}
        label={hasLabel && customName}
        initialValue={initialValue}
        rules={innerRequired ? rules : undefined}
        {...rest}
      >
        <Input maxLength={maxLength} placeholder={holderPlace(placeholder, customName)} {...rest} />
      </Form.Item>
    )
    return makeResponsive(rawItem)
  }

  const NumberFormItem = ({
    customName = '序号',
    formName = 'sort',
    placeholder,
    initialValue,
    required: innerRequired,
    ...rest
  }: CustomFormItemProps) => {
    const sumRequired = innerRequired ?? required
    const rawItem = (
      <Form.Item
        name={formName}
        required={sumRequired}
        label={hasLabel && customName}
        initialValue={initialValue}
        rules={ruleNonnegativeNumber({ text: customName, required: sumRequired })}
      >
        {/* @ts-ignore */}
        <InputNumber
          {...rest}
          precision={0}
          min={1}
          maxLength={20}
          placeholder={holderPlace(placeholder, customName)}
        />
      </Form.Item>
    )
    return makeResponsive(rawItem)
  }

  const TextAreaFormItem = ({
    customName = '课节重点',
    formName = 'keyPoint',
    placeholder,
    initialValue,
    required,
    ...rest
  }: CustomFormItemProps) => {
    const rawItem = (
      <Form.Item name={formName} required={required} label={hasLabel && customName} initialValue={initialValue}>
        <Input.TextArea maxLength={500} placeholder={holderPlace(placeholder, customName)} {...rest} />
      </Form.Item>
    )
    return makeResponsive(rawItem)
  }

  const Tel = ({
    customName = '手机号',
    formName = 'mobile',
    placeholder,
    rule,
    maxLength = 11,
    required: innerRequired
  }: CustomFormItemProps) => {
    const sumRequired = innerRequired ?? required
    placeholder = holderPlace(placeholder, customName)
    const rules = rule
      ? rule
      : formName === 'mobile'
      ? ruleTelephone({ text: placeholder, required: sumRequired })
      : ruleLandline({ text: placeholder, required: sumRequired })

    const rawItem = (
      <Form.Item name={formName} label={hasLabel && customName} rules={rules}>
        <Input maxLength={maxLength} placeholder={placeholder} />
      </Form.Item>
    )
    return makeResponsive(rawItem)
  }

  const Email = ({
    customName = '电子邮箱',
    formName = 'email',
    placeholder,
    required: innerRequired = false
  }: CustomFormItemProps) => {
    const rawItem = (
      <Form.Item
        name={formName}
        label={hasLabel && customName}
        rules={ruleEmail({ text: customName, required: innerRequired ?? required })}
      >
        <Input placeholder={holderPlace(placeholder, customName)} />
      </Form.Item>
    )
    return makeResponsive(rawItem)
  }

  const XForm = ({ customName = '员工姓名', formName, children, rest, required = true }: CustomFormItemProps) => {
    const rawItem = (
      <Form.Item
        {...rest}
        name={formName}
        required={required}
        label={hasLabel && customName}
        rules={ruleCommonSelect({ text: customName, required })}
      >
        {children}
      </Form.Item>
    )
    return makeResponsive(rawItem)
  }

  const DeptOf = ({
    treeData,
    disabled = false,
    rule,
    customName = '主要部门',
    formName = 'majorDeptId',
    required: innerRequired = false,
    multiple = false
  }: CustomFormItemProps) => {
    const rules = rule || ruleCommonSelect({ text: customName, required: innerRequired ?? required })
    const dept = (
      <Form.Item name={formName} label={hasLabel && customName} rules={rules}>
        <TreeSelect
          disabled={disabled}
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={treeData}
          placeholder="请选择部门"
          showArrow
          allowClear
          treeDefaultExpandAll
          multiple={multiple}
          getPopupContainer={trigger => trigger?.parentElement}
        ></TreeSelect>
      </Form.Item>
    )

    return responsive ? <Col {...wrapperCol}>{dept}</Col> : dept
  }

  const RoleType = ({ roleTreeData = [] }: { roleTreeData: RoleGetAllResult }) => {
    const rawItem = (
      <Form.Item name="roleIds" label={hasLabel && '角色类型'} rules={ruleCommonSelect({ text: '角色类型', required })}>
        {GenSelectGroupOfArray<any>({
          options: roleTreeData,
          mode: 'multiple',
          hasAll: false,
          placeholder: '请选择角色类型',
          valueProp: 'roleName'
        })}
      </Form.Item>
    )
    return makeResponsive(rawItem)
  }

  const CheckboxType = ({
    optionList = [],
    formName = 'dictIds',
    customName = '授课学科',
    rest
  }: CustomFormItemProps) => {
    const rawItem = (
      <Form.Item
        {...rest}
        name={formName}
        label={hasLabel && customName}
        rules={ruleCommonSelect({ text: customName, required })}
      >
        {GenCheckboxGroup({
          options: optionList
        })}
      </Form.Item>
    )
    return rawItem
  }

  const RadioType = ({
    formName = 'positionType',
    customName = '全职兼职',
    optionMap = TeacherStatusMap,
    required = true,
    disabled,
    rest
  }: CustomFormItemProps) => {
    const rawItem = (
      <Form.Item
        name={formName}
        label={hasLabel && customName}
        rules={ruleCommonSelect({ text: customName, required })}
        {...rest}
      >
        {GenRadioGroup({
          options: optionMap,
          disabled
        })}
      </Form.Item>
    )
    return rawItem
  }

  const DictSelectType = ({
    mode,
    hasAll,
    placeholder,
    formName = 'dictIds',
    valueProp = 'code',
    optionList = [],
    customName = '授课学科',
    initialValue = undefined,
    disabled = false,
    required: innerRequired = false,
    allowClear,
    rest
  }: CustomFormItemProps) => {
    const rawItem = (
      <Form.Item
        {...rest}
        name={formName}
        label={hasLabel && customName}
        initialValue={initialValue}
        rules={ruleCommonSelect({ text: customName, required: innerRequired ?? required })}
        placeholder={holderPlace(placeholder, customName, true)}
      >
        {GenSelectGroupOfDict({
          options: optionList,
          mode,
          hasAll,
          placeholder: holderPlace(placeholder, customName, true),
          valueProp,
          disabled,
          allowClear
        })}
      </Form.Item>
    )
    return makeResponsive(rawItem)
  }

  const StaffStatus = ({
    customName = '员工状态',
    hasAll = false,
    placeholder,
    formName = 'userStatus',
    optionMap = StaffStatusMap,
    rest
  }: CustomFormItemProps) => {
    const rawItem = (
      <Form.Item
        {...rest}
        name={formName}
        label={hasLabel && customName}
        rules={ruleCommonSelect({ text: '员工状态', required })}
      >
        {GenSelectGroup({
          options: optionMap,
          hasAll,
          placeholder: holderPlace(placeholder, customName, true)
        })}
      </Form.Item>
    )
    return makeResponsive(rawItem)
  }

  const BusinessDept = ({ customName = '是否为业务部门' }: CustomFormItemProps) => {
    const rawItem = (
      <Form.Item
        name="isBusiness"
        label={hasLabel && customName}
        rules={[{ required, message: '请选择是否是业务部门' }]}
      >
        {GenRadioGroup({
          options: IsBusinessMap
        })}
      </Form.Item>
    )

    return makeResponsive(rawItem)
  }
  const CloudDiskDept = ({ customName = '是否开通云盘权限' }: CustomFormItemProps) => {
    const rawItem = (
      <Form.Item
        name="cloudDiskPermission"
        label={hasLabel && customName}
        rules={[{ required, message: '请选择是否开通云盘权限' }]}
      >
        {GenRadioGroup({
          options: IsCloudDiskMap
        })}
      </Form.Item>
    )

    return makeResponsive(rawItem)
  }
  const SearchBtn = ({
    onSearch,
    onReset,
    searchIcon = true
  }: {
    onSearch: () => void
    onReset: () => void
    searchIcon?: boolean
  }) => {
    const search = (
      <Form.Item>
        <Button style={{ marginRight: 10 }} onClick={onReset}>
          重置
        </Button>
        <Button type="primary" onClick={onSearch} icon={searchIcon ? <SearchOutlined /> : null}>
          搜索
        </Button>
      </Form.Item>
    )
    return responsive ? (
      <Col {...wrapperColSearchBtn} className="ant-staff-dec-btn">
        {search}
      </Col>
    ) : (
      search
    )
  }

  // 关键字搜索
  const SearchSelectFormItem = ({
    api,
    onSetFileldsValue,
    customName = '授课老师',
    hasAll = false,
    placeholder,
    formName = 'lecturerUserId',
    initialValue,
    required = false,
    disabled = false,
    ...rest
  }: SearchSelectProps) => {
    const rawItem = (
      <Form.Item name={formName} label={hasLabel && customName}>
        <SearchSelect
          api={api}
          formName={formName}
          hasAll={hasAll}
          disabled={disabled}
          initialValue={initialValue}
          onSetFileldsValue={onSetFileldsValue}
          placeholder={holderPlace(placeholder, customName, true)}
          {...rest}
        />
      </Form.Item>
    )
    return makeResponsive(rawItem)
  }

  const DictInputCommon = ({
    customName = '计划招生人数',
    formName = 'planNo',
    placeholder,
    innerHasLabel = true,
    initialValue,
    required = false,
    rest
  }: CustomFormItemProps) => {
    const { anotherRule, ...restOfRest } = rest || {}
    const rules = anotherRule
      ? rulePadEnd2Number({ text: customName, required })
      : ruleNonnegativeNumber({ text: customName, required })

    const rawItem = (
      <Form.Item
        className="ant-form-input-number"
        name={formName}
        label={innerHasLabel ? hasLabel && customName : false}
        initialValue={initialValue}
        rules={rules}
        {...restOfRest}
      >
        <Input type="number" min={0} maxLength={MAX_LENGTH} placeholder={holderPlace(placeholder, customName)} />
      </Form.Item>
    )
    return makeResponsive(rawItem)
  }

  // 通用状态
  const CommonStatus = ({
    customName = '班级状态',
    formName = 'classStatus',
    statusDescribeMap = ClassStatusMap,
    disabledItems = [],
    initialValue,
    handleChange,
    disabled = false
  }: CustomFormItemProps) => {
    const rawItem = (
      <Form.Item
        name={formName}
        label={customName}
        rules={ruleCommonSelect({ text: customName, required })}
        initialValue={initialValue}
      >
        {GenSelectGroup({
          options: statusDescribeMap,
          hasAll: false,
          placeholder: `请选择${customName}`,
          disabledItems,
          onChange: handleChange,
          disabled
        })}
      </Form.Item>
    )
    return makeResponsive(rawItem)
  }

  // 通用时间选择范围
  const CommonPicker = ({
    customName = '时间范围',
    formName = '',
    initialValue,
    startTime,
    endTime,
    disabled = false,
    required: innerRequired = false,
    rest = {
      format: 'HH:mm',
      showTime: false
    },
    format = 'YYYY-MM-DD'
  }: CustomFormItemProps) => {
    const rawItem = (
      <Form.Item
        name={formName}
        label={customName}
        rules={ruleCommonSelect({ text: customName, required: innerRequired ?? required })}
        initialValue={
          startTime && endTime && [moment(startTime, FORMATWEEK_WITH_HM), moment(endTime, FORMATWEEK_WITH_HM)]
        }
      >
        <RangePicker
          disabled={disabled}
          defaultValue={initialValue}
          style={{ width: '100%' }}
          getPopupContainer={trigger => trigger?.parentElement || document.body}
          showTime={rest.showTime && { format: rest.format }}
          format={format}
        />
      </Form.Item>
    )
    return makeResponsive(rawItem)
  }

  const CommonIndate = ({
    customName = '有效期',
    formName = 'indate',
    required,
    rest = {
      format: FORMATWEEK,
      showTime: true
    },
    initialValue = undefined,
    disabled = false,
    disabledDate = undefined
  }: CustomFormItemProps) => {
    const rawItem = (
      <Form.Item
        name={formName}
        label={customName}
        initialValue={initialValue ? moment(initialValue, FORMATWEEK_WITH_HM) : undefined}
        rules={ruleCommonSelect({ text: customName, required })}
      >
        <DatePicker
          format={rest.format}
          style={{ width: '100%' }}
          showTime={rest.showTime && { format: 'HH:mm' }}
          disabled={disabled}
          disabledDate={disabledDate}
          getPopupContainer={trigger => trigger?.parentElement || document.body}
        />
      </Form.Item>
    )
    return makeResponsive(rawItem)
  }
  // 筛选老师
  const CommonTeacher = ({
    customName = '授课老师',
    formName = 'lecturerUserId',
    required = false
  }: CustomFormItemProps) => {
    const rawItem = (
      <Form.Item
        name={formName}
        label={customName}
        rules={ruleCommonSelect({ text: customName, required })}
      ></Form.Item>
    )
    return makeResponsive(rawItem)
  }

 

  return {
    Name,
    NumberFormItem,
    TextAreaFormItem,
    Tel,
    Email,
    XForm,
    RoleType,
    DictSelectType,
    StaffStatus,
    DeptOf,
    BusinessDept,
    CloudDiskDept,
    SearchBtn,
    DictInputCommon,
    CommonStatus,
    CommonPicker,
    CommonIndate,
    CommonTeacher,
    CheckboxType,
    RadioType,
    SearchSelectFormItem,
    makeResponsive
  }
}

export function useBaseForm(options: UseBaseFrom) {
  return useFrom({
    genFormItems: genBaseFormItems,
    ...options
  })
}
