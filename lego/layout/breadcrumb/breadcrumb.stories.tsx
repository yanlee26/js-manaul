import { storiesOf } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { BreadcrumbType, OnlyBreadcrumb } from './index'

const breadcrumbMap = [
  [
    { breadcrumbName: '课程列表', path: '/recordingClass/list' },
    { breadcrumbName: '详情', path: '/recordingClass/detail/:id' },
    { breadcrumbName: '课程管理', path: '/iframe.html' }
  ]
].reduce((acc, list) => {
  list.forEach((item, index) => {
    const { path } = item
    acc.set(path, { hidden: index === 0, items: list.slice(0, index + 1) })
  })

  return acc
}, new Map<string, BreadcrumbType>())

storiesOf('Only-UI | OnlyBreadcrumb', module).add('default', () => {
  return (
    <BrowserRouter>
      <OnlyBreadcrumb breadcrumbMap={breadcrumbMap}></OnlyBreadcrumb>
    </BrowserRouter>
  )
})
