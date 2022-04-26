const specialCharacters = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
const telephone = /^[1]([3-9])[0-9]{9}$/
const email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
const zipCode = /^[0-9]{6}$/
const qq = /^[1-9][0-9]{4,11}$/
const phone = /^[0][1-9]{2,3}-?[0-9]{5,10}$/
const linkPattern = /^https?:\/\/.+/
const number = /^[0-9]+$/
const discount = /^[0-9]+(.[0-9]{0,2})?$/
const chineseAndEnglish = /^[a-zA-Z\u4e00-\u9fa5]+$/
const userName = /^[a-zA-Z0-9_-\u4e00-\u9fa5]*[a-zA-Z\u4e00-\u9fa5]+[a-zA-Z0-9_-\u4e00-\u9fa5]*$/
const noChinese = /^[^\u4e00-\u9fa5]+$/
const numberOrLetter = /^[a-zA-Z0-9]+$/
export {
  specialCharacters,
  telephone,
  email,
  zipCode,
  qq,
  phone,
  linkPattern,
  number,
  discount,
  userName,
  noChinese,
  chineseAndEnglish,
  numberOrLetter
}
