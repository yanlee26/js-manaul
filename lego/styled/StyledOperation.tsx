import React, { ReactNode, memo, Children, ReactElement } from 'react'
import { Divider, Dropdown, Menu } from 'antd'
import styled from 'styled-components'
import { EllipsisOutlined } from '@ant-design/icons'
import { Flex } from './Flex'

interface StyledOperationParams {
  children?: JSX.Element | JSX.Element[] | ReactNode
  onClick?: Function
}
const Container = styled<any>(Flex)`
  > div {
    white-space: nowrap;
  }
`
export const StyledOperation = ({ children, onClick }: StyledOperationParams) => (
  <Container noWrap onClick={() => onClick && onClick()}>
    {Children.toArray(children)
      .filter(_ => !(_ as JSX.Element)?.props?.hidden)
      ?.map((child, i) => {
        const hidden = (child as JSX.Element)?.props?.hidden
        return (
          <div key={i}>
            {!!i && hidden === false && <Divider type="vertical" />}
            {child}
          </div>
        )
      })}
  </Container>
)

export function addReactElementProps(child: ReactElement<any>, props: { [x: string]: any } = { size: 'small' }) {
  return React.cloneElement(child, props)
}
/**
 * @description 操作栏...Dropdown下拉
 */
export const MoreItemDropDownContainer = memo(({ children }) => {
  return (
    <Dropdown
      overlay={() => (
        <Menu>
          {Children.toArray(children)?.map((child, i) => {
            return <Menu.Item key={i}>{addReactElementProps(child as ReactElement<any>)}</Menu.Item>
          })}
        </Menu>
      )}
    >
      <EllipsisOutlined />
    </Dropdown>
  )
})
