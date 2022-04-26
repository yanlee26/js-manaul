import { Button, Menu } from 'antd'
import React from 'react'
import { BaseItem } from './type'

interface Props {
  items: BaseItem[]
}

export const OperationMoreMenu = (props: Props) => {
  const { items } = props
  return (
    <Menu
      style={{
        border: '0',
        borderRadius: '2px',
        boxShadow: 'rgb(85 102 117 / 24%) 0px 4px 8px 0px'
      }}
    >
      {items.map((item: BaseItem) => {
        if (item.hidden) return null

        return (
          <Menu.Item
            key={item.id}
            style={{
              textAlign: 'center',
              margin: 0,
              padding: '0 4px'
            }}
          >
            <Button
              icon={item.icon}
              type={item.type || 'link'}
              loading={item.loading}
              disabled={item.disabled}
              hidden={item.hidden}
              danger={item.danger}
              onClick={item.onClick}
              size="small"
            >
              {item.text}
            </Button>
          </Menu.Item>
        )
      })}
    </Menu>
  )
}
