import { BASE_URLS } from 'config'

export const fetchData = (url: string, data: any) => {
  // Default options are marked with *
  return fetch(`${BASE_URLS[process.env.REACT_APP_ENV!]}${url}`, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json;charset=UTF-8',
      token: localStorage.getItem('token') || ''
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer' // *client, no-referrer
  })
}

export const downloadBlob = (blob: any, name: string) => {
  const elink = document.createElement('a')
  elink.download = name
  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href) // 释放URL 对象
  document.body.removeChild(elink)
}

export const exportExcel = (url: string, data: any, name: string) =>
  fetchData(url, data)
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject('导出失败')
      }
      return res.blob()
    })
    .then(blob => {
      downloadBlob(blob, name)
      return Promise.resolve('导出成功')
    })
