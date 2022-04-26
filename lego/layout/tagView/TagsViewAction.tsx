import React from 'react'
import { Menu, Dropdown } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

export interface TagsViewActionProps {
  onRemoveCurrent: () => void
  onRemoveAll: () => void
  onRemoveOther: () => void
}

export const TagsViewAction = ({ onRemoveCurrent, onRemoveOther, onRemoveAll }: TagsViewActionProps) => {
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="0" onClick={onRemoveCurrent}>
            关闭当前
          </Menu.Item>
          <Menu.Item key="1" onClick={onRemoveOther}>
            关闭其它
          </Menu.Item>
          <Menu.Item key="2" onClick={onRemoveAll}>
            关闭所有
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={onRemoveAll}>
            dashboard
          </Menu.Item>
        </Menu>
      }
    >
      <span id="pageTabs-actions">
        <SettingOutlined className="tagsView-extra" />
      </span>
    </Dropdown>
  )
}
