import { Button, Result } from 'antd'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const loginPath = `/login`

export const UnAuthorized = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.pathname
  const hasNoDataPermission = from === '/no-data-permission'
  return (
    <Result
      status="403"
      title={hasNoDataPermission ? '' : '403'}
      subTitle={hasNoDataPermission ? '暂无权限，请联系业务老师操作' : 'unauthorized'}
      extra={
        !hasNoDataPermission && (
          <Button type="primary" onClick={() => navigate(loginPath, { replace: true, state: { from } })}>
            goToLogin
          </Button>
        )
      }
    />
  )
}
