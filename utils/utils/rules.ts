import { email, landline, linkPattern, nonnegativeNumber, padEnd2Number, telephone, telephone4Search } from './regExp'

interface Props {
  text: string
  required?: boolean
}
export const ruleCommonSelect = ({ text, required = true }: Props) => {
  return [{ required, message: `请选择${text}` }]
}
// 通用规则 -- 输入
export const ruleCommonInput = ({ text, required = true }: Props) => {
  return [{ required, whitespace: true, message: `请选择${text}` }]
}
// 校验特殊字符
export const ruleSpecialCharacters = ({ text, required = true }: Props) => {
  return [
    { required: required, message: `请输入${text}` },
    {
      whitespace: true,
      message: '不能输入空格'
    }
    //NOTE: 暂时放开 { pattern: specialCharacters, message: `不能输入特殊字符` }
  ]
}

// 只能输入非负数

export const ruleNonnegativeNumber = ({ text, required = true }: Props) => {
  return [
    { required: required, message: `请输入${text}` },
    { pattern: nonnegativeNumber, message: `只能输入正整数` }
  ]
}
// 输入保留两位小数的正整数
export const rulePadEnd2Number = ({ text, required = true }: Props) => {
  return [
    { required: required, message: `请输入${text}` },
    { pattern: padEnd2Number, message: `只能输入正数(至多两位小数)` }
  ]
}
// 校验手机号
export const ruleTelephone = ({ text, required = true }: Props) => {
  return [
    { required, message: text },
    {
      whitespace: true,
      message: '不能输入空格'
    },
    { pattern: required ? telephone : telephone4Search, message: `请输入正确格式的手机号`, validateTrigger: 'onChange' }
  ]
}
// 校验邮箱
export const ruleEmail = ({ text, required = true }: Props) => {
  return [
    { required: required, message: `请输入${text}` },
    {
      whitespace: true,
      message: '不能输入空格'
    },
    {
      pattern: email,
      message: `请输入正确格式的${text}`
    }
  ]
}
export const ruleLandline = ({ text, required = true }: Props) => {
  return [
    { required, message: text },
    {
      whitespace: true,
      message: '不能输入空格'
    },
    {
      pattern: required ? landline : telephone4Search,
      message: '请输入正确的座机号（区号+座机号）',
      validateTrigger: 'onChange'
    }
  ]
}
export const ruleLink = ({ text = '请输入正确的链接', required = true }: Props) => {
  return [
    { required: required, message: text },
    {
      whitespace: true,
      message: '不能输入空格'
    },
    { pattern: linkPattern, message: text, validateTrigger: 'onChange' }
  ]
}
