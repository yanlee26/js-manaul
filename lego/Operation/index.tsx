import { EllipsisOutlined } from '@ant-design/icons'
import { Button, Divider, Dropdown } from 'antd'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { OperationMoreMenu } from './MoreMenu'
import { BaseItem } from './type'
interface Props {
  buttonItems: BaseItem[]
  moreItems?: BaseItem[]
  children?: ReactNode
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  > div {
    white-space: nowrap;
  }
`

const OperationContainer = (props: Props) => {
  const { buttonItems, moreItems, children } = props

  return (
    <Container>
      {buttonItems
        .filter(item => !item.hidden)
        .map((item: BaseItem, index: number) => {
          return (
            <div key={item.id}>
              {index !== 0 && !item.hidden && <Divider type="vertical" />}
              <Button
                icon={item.icon}
                type={item.type || 'link'}
                loading={item.loading}
                disabled={item.disabled}
                hidden={item.hidden}
                onClick={item.onClick}
                danger={item.danger}
              >
                {item.text}
              </Button>
            </div>
          )
        })}

      {moreItems && moreItems.length > 0 && moreItems.some(item => !item.hidden) && (
        <div key="moreItems">
          <Divider type="vertical" />
          <Dropdown overlay={<OperationMoreMenu items={moreItems} />} placement="bottomLeft">
            <Button type="link">
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        </div>
      )}
      {children}
    </Container>
  )
}

export { OperationContainer }
