import { Modal, ModalProps } from 'antd'
import React from 'react'
import styled from 'styled-components'

type StyledModalWithModalWrapProps = { children: JSX.Element | JSX.Element[] } & ModalProps & ModalWrapProps
function findTableNode(node: JSX.Element) {
  return /list|table/gi.test(node.type.name)
}

type ModalWrapProps = {
  reducedHeight?: number
}
// 236 -> bottom: 40px
export const ModalWrap = styled.div<ModalWrapProps>`
  margin-right: -20px;
  padding-right: 20px;
  overflow-y: auto;
  height: ${({ reducedHeight = 236 }) => {
    return `calc(100vh - ${reducedHeight}px)`
  }};
`
export const FormWrap = styled<any>(ModalWrap)`
  .ant-form-item-label > label {
    font-weight: 600;
  }
  .ant-btn-link {
    span {
      text-decoration: underline;
    }
  }
`

export const StyledModalWithModalWrap = ({ children, reducedHeight, ...props }: StyledModalWithModalWrapProps) => {
  const tableNode = Array.isArray(children) ? children.find(findTableNode) : findTableNode(children) ? children : null
  const isTableEmpty = tableNode?.props?.dataSource?.length || tableNode?.props?.data?.length
  return (
    <Modal {...props} style={{ top: 40, bottom: 40 }}>
      {isTableEmpty === 0 ? children : <ModalWrap reducedHeight={reducedHeight}>{children}</ModalWrap>}
    </Modal>
  )
}

export const StyledOnlyModalTable = styled.div`
  .ant-table-container {
    .ant-table-container {
      margin-left: -40px;
      .ant-table-thead {
        background: #e6e9eb;
      }
      .ant-table-tbody {
        background: #f7f9fb;
      }
    }
  }
`
