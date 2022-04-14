const specialCharacters = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
// 支持模糊搜索
const telephone4Search = /^\d{1,}$/g
const telephone = /^[1]([3-9])[0-9]{9}$/

const targetLandlineReg = /^(\d{3})(\d{4})(\d{3,})$/g
const landline = /^\d{11,}$/g // 先不限制
const email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
const nonnegativeNumber = /^[1-9]\d*$/
const padEnd2Number = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/

export {
  specialCharacters,
  padEnd2Number,
  telephone,
  telephone4Search,
  email,
  landline,
  targetLandlineReg,
  nonnegativeNumber
}
export const linkPattern = /^https?:\/\/.+/
export const numberPattern = /^[0-9]+$/g
