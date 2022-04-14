import { getURLProperty } from 'utils'

export function addImagePrefix<T = any>(images: Array<T> = []): any[] {
  if (!Array.isArray(images)) {
    return []
  }
  if (!images.filter(x => x).length) {
    return []
  }
  return images.map(url => {
    // @ts-ignore
    const uid = typeof url === 'string' ? url : url?.props?.txt
    return {
      uid,
      status: 'done',
      url: uid
    }
  })
}

export function fileListDisplay(list: Array<any> = []): any[] {
  if (!Array.isArray(list)) {
    return []
  }
  if (!list.filter(x => x).length) {
    return []
  }
  // local and online
  return list.map(({ fileName, name, cosKey, url }) => ({ name: fileName || name, url: cosKey || getURLProperty(url) }))
}
