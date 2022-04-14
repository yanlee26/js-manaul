import { DEFAULTOCCUPYSTRING } from 'config'
import { targetLandlineReg } from './regExp'

type StringArray = Array<string>

export function VMProxy(target: StringArray) {
  const handler = {
    get(target: StringArray, prop: number) {
      return Reflect.get(target, prop) || DEFAULTOCCUPYSTRING
    }
  }
  // @ts-ignore
  return new Proxy(target, handler)
}

export function VMMapProxy(target: Map<string | number, string>) {
  return (key: string | number) => target.get(key) || DEFAULTOCCUPYSTRING
}

export function simpleProxy(target: number | string | boolean | undefined | null) {
  return ['', undefined, null].includes(target as any) ? DEFAULTOCCUPYSTRING : (target as string)
}

export function dictVMProxy(list: Array<Record<string, any>>, prop = 'value'): string {
  if (!list) return DEFAULTOCCUPYSTRING
  return simpleProxy(list.map(x => x[prop]).join('、'))
}

export function patchBENullData(list: Array<any> | null) {
  return list ?? []
}

export function displayLandLine(target: string, reg = targetLandlineReg) {
  if (!target) return DEFAULTOCCUPYSTRING
  return target.replace(reg, '$1-$2 $3')
}

export function pricePadEnd2(price: number) {
  if (!price) return '0.00'
  return typeof price === 'number' ? price.toFixed(2) : price
}

export function percentsPadEnd2(points: number, base = 1) {
  if (!base) return '0.00%'
  return `${Number((points / base) * 100).toFixed(2)}%`
}

export function hiddeStringDetail(str: string, len = 10) {
  if (!str) return DEFAULTOCCUPYSTRING
  return str.length > len ? `${str.slice(0, len)}...` : str
}
