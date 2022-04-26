import { ConfigProvider } from 'antd'
import React from 'react'

export const LegoLocale = ({ children, locale }) => <ConfigProvider locale={locale}>{children}</ConfigProvider>
