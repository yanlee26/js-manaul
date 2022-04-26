import { bytesCount } from '@keukenhof/utils'
import { Tooltip } from 'antd'
import React, { ReactChild } from 'react'
import styled from 'styled-components'

const MAX_STR_LENGTH = 60
const TOOLTIP_WIDTH = 320
const MAX_WIDTH = 260
interface EllipsisTextProps {
  width?: number
  row?: 1 | 2
  className?: string
  link?: boolean
  onClick?: (o?: any) => void
}

export const EllipsisText = styled.div<Partial<EllipsisTextProps>>`
  max-width: ${props => props.width || MAX_WIDTH}px;
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.row || 2};
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
  cursor: ${props => (props.link ? 'pointer' : 'inherit')};
`
interface EllipsisTextContainerProps extends EllipsisTextProps {
  children?: ReactChild
  maxStrLen?: number
  toolTipWidth?: number
}

export const EllipsisTextContainer = ({
  children,
  maxStrLen = MAX_STR_LENGTH,
  toolTipWidth = TOOLTIP_WIDTH,
  ...props
}: EllipsisTextContainerProps) => {
  return (
    <Tooltip
      placement="top"
      style={{ width: toolTipWidth }}
      title={bytesCount(children as string) > maxStrLen && children}
      getPopupContainer={trigger => trigger.parentElement!}
    >
      <EllipsisText className={props.link ? 'ant-btn-link' : ''} {...props}>
        {children}
      </EllipsisText>
    </Tooltip>
  )
}
