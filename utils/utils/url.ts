// https://www.zhangxinxu.com/wordpress/2019/08/js-url-urlsearchparams/


export function genSearchParams(params: string | string[][] | Record<string, string> | URLSearchParams | undefined) {
  return new URLSearchParams(params)
}

export function getSearchParamsString(
  params: string | string[][] | Record<string, string> | URLSearchParams | undefined
) {
  return genSearchParams(params).toString()
}

export function appendSearchParams(query: URLSearchParams, key: string, value: string) {
  query.append(key, value)

  return query.toString()
}

export function deleteSearchParams(query: URLSearchParams, key: string) {
  query.delete(key)

  return query.toString()
}

export function getEntries(query: URLSearchParams) {
  return query.entries()
}

export function getSearchParams(query: URLSearchParams, key: string) {
  return query.get(key)
}

export function setSearchParams(query: URLSearchParams, key: string, value: string) {
  query.set(key, value)
  return query.toString()
}

export function hasSearchParams(query: URLSearchParams, key: string) {
  return query.has(key)
}

export function genURL(url = '', base: string) {
  return new URL(url, base)
}

export function getURLString(url = '', base: string) {
  return new URL(url, base).toString()
}
