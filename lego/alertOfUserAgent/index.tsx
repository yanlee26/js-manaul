import React from 'react'
import { StyAlertWrap, StyChildrenWrap } from './style'

interface Props {
  children: JSX.Element
}

export const AlertOfUserAgent = ({ children }: Props) => {
  const userAgent = navigator.userAgent.toLowerCase()
  const excludeBrowser = ['qqbrowser/', 'edg/', 'metasr', 'qihu', '360ee']
  const isChrome = userAgent.includes('chrome') && excludeBrowser.every(item => !userAgent.includes(item))
  return isChrome ? (
    children
  ) : (
    <div>
      <StyAlertWrap>
        <span className="content">为了更好的体验，请使用谷歌浏览器（Chrome）访问</span>
        <a className="download" href="https://www.google.cn/chrome/" target="_blank" rel="noreferrer">
          前往下载
        </a>
      </StyAlertWrap>
      <StyChildrenWrap>{children}</StyChildrenWrap>
    </div>
  )
}
