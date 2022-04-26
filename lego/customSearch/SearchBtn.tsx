import { DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons'
import { Button, Col } from 'antd'
import React from 'react'
import styled from 'styled-components'

const SearchBtnContainer = styled(Col)<{ justify: string }>`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justify};
`

const SpecialFormItem = styled.div`
  .ant-form-item-control-input-content {
    display: flex;
    flex-direction: column;
    .ant-btn-link {
      padding: 0;
    }
  }
`

const SearchBtn = (props: {
  isShowFoldButton: boolean
  isShowUp?: boolean
  colFlex?: string
  onSearch(): void
  onReset(): void
  onShowFold?(): void
}) => {
  return (
    <SearchBtnContainer
      flex={props.colFlex ? props.colFlex : 'auto'}
      justify={props.isShowFoldButton ? 'space-between' : 'flex-end'}
    >
      {props.isShowFoldButton && (
        <Button type="link" onClick={props.onShowFold}>
          {props.isShowUp ? '折叠' : '展开'}
          {props.isShowUp ? <UpOutlined /> : <DownOutlined />}
        </Button>
      )}
      <SpecialFormItem>
        <Button type="primary" icon={<SearchOutlined />} onClick={props.onSearch} style={{ margin: 'auto 10px' }}>
          搜索
        </Button>
        <Button onClick={props.onReset}>重置</Button>
      </SpecialFormItem>
    </SearchBtnContainer>
  )
}

export { SearchBtn }
