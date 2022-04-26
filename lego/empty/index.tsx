import { RightOutlined } from '@ant-design/icons'
import { Empty } from 'antd'
import React, { ReactChild } from 'react'

interface CustomizeRenderEmptyProps {
  emptyText?: string
  actionText?: string
  action?: () => void
}

export const CustomizeRenderEmpty = ({
  emptyText = '还没有课程产品，',
  actionText = '立即选择',
  action
}: CustomizeRenderEmptyProps) => (
  <div style={{ textAlign: 'center', fontSize: '18px' }}>
    <p>
      {emptyText}
      <span style={{ color: '#1890FF', cursor: 'pointer' }} onClick={action}>
        {actionText}
        <RightOutlined />
      </span>
    </p>
  </div>
)

interface WithEmptyProps {
  data: Array<any>
  children?: ReactChild
}
export function WithEmpty({ data, children }: WithEmptyProps) {
  return <div>{data.length ? children : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}</div>
}
