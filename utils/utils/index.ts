export * from './time'
export * from './proxy'
export * from './copy'
export * from './rules'
export * from './prefix'
export * from './modal'
export * from './url'

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

export async function patchAPICatch({ params, type = '', api, onSuccess }: patchCatchParams) {
  // 一般错误统一抛出
  try {
    const { success, data } = await api(params)
    if (success === false) {
      // message.error(`${type}失败！`)
    } else {
      type && message.success(`${type}成功！`)
      if (onSuccess) {
        onSuccess(data)
      }
    }
  } catch (e) {
    console.error(`${type}失败！`)
  }
}
