import React, { ReactNode } from 'react'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from 'components/only-icon'

type ConfirmType = {
  title: string | ReactNode
  onOk?: () => void
  okText?: string
}

export function onConfirm({ title, onOk, okText = '确认' }: ConfirmType) {
  Modal.confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    okText,
    cancelText: '取消',
    onOk
  })
}

export function onWarning({ title, onOk, okText = '知道了' }: ConfirmType) {
  Modal.warning({
    title,
    icon: <ExclamationCircleOutlined />,
    okText,
    onOk
  })
}
