import { Col, ColProps, Row } from 'antd'
import React from 'react'
import { StyFilterWrap } from '../styled'

const responsiveSpan = {
  xs: { span: 24 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 8 },
  xl: { span: 8 },
  xxl: { span: 6 }
}

interface ChildrenProps {
  children: React.ReactElement[] | React.ReactElement
  label?: string
}

interface Props {
  children: React.ReactElement[] | React.ReactElement | any
  buttons?: React.ReactElement[] | React.ReactElement
  colProps?: ColProps
}

export const SearchItem = ({ children, label }: ChildrenProps) => {
  return (
    <div className="filter-item">
      {label && <label className="label-wrap">{label}：</label>}
      {children}
    </div>
  )
}

export const SearchFilter = ({ children, buttons, colProps }: Props) => {
  const _children = (Array.isArray(children) ? children : [children]).flat()
  const _ColProps = { ...responsiveSpan, ...colProps }
  return (
    <StyFilterWrap>
      <Row gutter={{ xs: 0, sm: 4, md: 8, lg: 24 }}>
        {_children
          .filter(item => item)
          .map((item, index) => (
            <Col key={index} {..._ColProps}>
              {item}
            </Col>
          ))}
        <Col key="button" span={24}>
          {buttons}
        </Col>
      </Row>
    </StyFilterWrap>
  )
}
SearchFilter.SearchItem = SearchItem
