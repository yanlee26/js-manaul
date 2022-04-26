import { SwapOutlined } from '@ant-design/icons'
import { apiGetSelectedDeptDataPermission } from '@keukenhof/api'
import { useAsync } from '@keukenhof/hooks'
import { DeptDataPermissionItem } from '@keukenhof/interface'
import { message } from 'antd'
import React from 'react'
import { ChangeDepartmentModal } from '../../changeDepartmentModal'
import { ModalButton } from '../../modalButton'

export const ChangeDepartment = () => {
  const { data, fetch } = useAsync<DeptDataPermissionItem>(
    apiGetSelectedDeptDataPermission,
    {} as DeptDataPermissionItem
  )
  const onSuccess = () => {
    message.success('设置成功')
    fetch()
  }

  return (
    <ModalButton
      type="text"
      render={({ visible, onClose }) => (
        <ChangeDepartmentModal visible={visible} onClose={onClose} onSuccess={onSuccess} />
      )}
    >
      {data?.deptDataPermissionName}
      <SwapOutlined />
    </ModalButton>
  )
}
