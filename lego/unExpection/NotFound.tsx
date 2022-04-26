import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DASHBOARD_PATH } from '../constant'

export const NotFound = (pagePath?: string) => {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle={'notfound'}
      extra={
        <Button type="primary" onClick={() => navigate(pagePath || DASHBOARD_PATH)}>
          返回首页
        </Button>
      }
    ></Result>
  )
}
export default NotFound
