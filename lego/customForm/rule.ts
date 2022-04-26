import {
  chineseAndEnglish,
  discount,
  email,
  noChinese,
  number,
  numberOrLetter,
  phone,
  qq,
  specialCharacters,
  telephone,
  userName,
  zipCode
} from './regex'

interface Props {
  text: string
  required?: boolean
}
// 通用规则 -- 选择
export const ruleCommonSelect = ({ text, required = true }: Props) => {
  return [{ required, message: `请选择${text}` }]
}

// 通用模糊搜索规则 -- 选择
export const ruleCommonSearchSelect = ({ text, required = true }: Props) => {
  return [{ required, message: `请输入${text}后选择` }]
}
// 通用规则 -- 输入
export const ruleCommonInput = ({ text, required = true }: Props) => {
  return [{ required, whitespace: true, message: `请输入${text}` }]
}
// 校验特殊字符
export const ruleSpecialCharacters = ({ text, required = true }: Props) => {
  return [
    { required, message: `请输入${text}` },
    {
      whitespace: true,
      message: '不能输入空格'
    },
    { pattern: specialCharacters, message: `不能输入特殊字符` }
  ]
}
// 校验手机号
export const ruleTelephone = ({ text, required = true }: Props) => {
  return [
    { required, message: `请输入${text}` },
    {
      whitespace: true,
      message: '不能输入空格'
    },
    { pattern: telephone, message: `请输入正确格式的${text}`, validateTrigger: 'onChange' }
  ]
}
// 校验邮箱
export const ruleEmail = ({ text, required = true }: Props) => {
  return [
    { required, message: `请输入${text}` },
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

// 校验邮编
export const ruleZipCode = ({ text, required = true }: Props) => {
  return [
    { required, message: `请输入${text}` },
    {
      whitespace: true,
      message: '不能输入空格'
    },
    {
      pattern: zipCode,
      message: `请输入正确格式的${text}`
    }
  ]
}

// 校验QQ
export const ruleQQ = ({ text, required = true }: Props) => {
  return [
    { required, message: `请输入${text}` },
    {
      whitespace: true,
      message: '不能输入空格'
    },
    {
      pattern: qq,
      message: `请输入正确格式的${text}`
    }
  ]
}

// 校验座机
export const rulePhone = ({ text, required = true }: Props) => {
  return [
    { required, message: `请输入${text}` },
    {
      whitespace: true,
      message: '不能输入空格'
    },
    {
      pattern: phone,
      message: `请输入正确格式的${text}`
    }
  ]
}

// 校验数字
export const ruleNumber = ({ text, required = true }: Props) => {
  return [
    { required, message: `请输入${text}` },
    // {
    //   whitespace: true,
    //   message: '不能输入空格'
    // },
    { pattern: number, message: `请输入正确格式的${text}`, validateTrigger: 'onChange' }
  ]
}

// 校验数字
export const ruleDiscount = ({ text, required = true }: Props) => {
  return [
    { required, message: `请输入${text}` },
    // {
    //   whitespace: true,
    //   message: '不能输入空格'
    // },
    { pattern: discount, message: `请输入正确格式的${text}`, validateTrigger: 'onChange' }
  ]
}

// 校验中英文
export const ruleChineseOrEnglish = ({ text, required = true }: Props) => {
  return [
    { required, message: `请输入${text}` },
    { pattern: chineseAndEnglish, message: `只能输入中英文`, validateTrigger: 'onChange' }
  ]
}

// 字母数字汉子_-(必须有字母或者汉子) -- 输入
export const ruleUserName = ({ text, required = true }: Props) => {
  return [
    { required, message: `请输入${text}` },
    {
      whitespace: true,
      message: '不能输入空格'
    },
    {
      pattern: userName,
      message: `请输入正确格式的${text}`
    }
  ]
}

// 除去中文
export const ruleNoChinese = ({ text, required = true }: Props) => {
  return [
    { required, message: `请输入${text}` },
    {
      whitespace: true,
      message: '不能输入空格'
    },
    {
      pattern: noChinese,
      message: `请输入正确格式的${text}`
    }
  ]
}

// 数字或字母
export const ruleNumberOrLetter = ({ text, required = true }: Props) => {
  return [
    { required, message: `请输入${text}` },
    {
      whitespace: true,
      message: '不能输入空格'
    },
    {
      pattern: numberOrLetter,
      message: `请输入正确格式的${text}`
    }
  ]
}

// 校验范围数字
export const ruleNumberPicker = ({ text, required = true }: Props) => {
  return [
    { required: required, message: `请输入${text}` },
    {
      validateTrigger: 'onChange',
      validator: async (_, value) => {
        if (!value) {
          return Promise.resolve()
        }

        if ([undefined, null].includes(value[0]) && [undefined, null].includes(value[1])) {
          return Promise.resolve()
        }

        if (![undefined, null].includes(value[0]) && ![undefined, null].includes(value[1]) && value[0] <= value[1]) {
          return Promise.resolve()
        }

        return Promise.reject(new Error('必须输入两个值且前值不能大于后值'))
      }
    }
  ]
}
