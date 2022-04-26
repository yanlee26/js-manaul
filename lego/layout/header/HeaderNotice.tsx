import { LoadingOutlined } from '@ant-design/icons'
import { Badge, Dropdown, Spin } from 'antd'
import { ReactComponent as NoticeSvg } from 'assets/notice.svg'
import React, { useState } from 'react'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export enum EventStatus {
  todo = 'rgba(255,255,255,0.65)',
  urgent = '#f5222d',
  doing = '#faad14',
  processing = '#1890ff'
}

interface Base {
  type: 'message' | 'notification' | 'event'
  id: string
  title: string
}

export interface Notification extends Base {
  type: 'notification'
  read?: boolean
  avatar: string
  datetime: string
}

export interface Message extends Base {
  type: 'message'
  read?: boolean
  avatar: string
  datetime: string
  description: string
  clickClose: boolean
}

export interface Event extends Base {
  type: 'event'
  description: string
  extra: string
  status: keyof typeof EventStatus
}

type Notices = Notification | Message | Event
export type Notice<T extends Notices['type'] | 'all' = 'all'> = T extends 'all'
  ? Notices
  : Extract<Notices, { type: T }>

export const HeaderNotice = () => {
  const [visible, setVisible] = useState(false)

  const tabs = (
    <div>
      <Spin tip="Loading..." indicator={antIcon}></Spin>
    </div>
  )
  return (
    <Dropdown
      overlay={tabs}
      placement="bottomRight"
      trigger={['click']}
      visible={visible}
      onVisibleChange={v => setVisible(v)}
      overlayStyle={{
        width: 336,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        padding: 8,
        borderRadius: 4
      }}
    >
      <Badge overflowCount={999}>
        <span className="notice" id="notice-center">
          <NoticeSvg className="anticon" />
        </span>
      </Badge>
    </Dropdown>
  )
}
