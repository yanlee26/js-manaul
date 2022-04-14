export * from './time'
export * from './proxy'
export * from './converter'
export * from './copy'
export * from './request'
export * from './rules'
export * from './utils'
export * from './prefix'
export * from './modal'
export * from './url'
export * from './storage'
export * from './string_encryption'
export * from './autoIncreateId'
export * from './initMathJax'

export function wait(seconds: number) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
  })
}

export function countChangedTimes(array: Array<number | string | boolean>) {
  return array.reduce((re: number, it, idx, arr) => {
    if (idx && it !== arr[idx - 1]) {
      re++
    }
    return re
  }, 0)
}
