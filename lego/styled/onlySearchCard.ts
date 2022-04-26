import { Card } from 'antd'
import styled from 'styled-components'

export const SearchCard = styled(Card)<{ isShow?: boolean; formItemNumber?: number }>`
  background-color: #f7f9fb;
  width: 100%;
  margin-bottom: 24px;
  @media (max-width: 768px) {
    .ant-form > .ant-row > .ant-col:nth-child(n + 4) {
      display: ${({ isShow = true }) => (isShow ? '' : 'none')};
    }
    .ant-col > .ant-btn {
      visibility: ${({ formItemNumber = 4 }) => (formItemNumber > 3 ? 'visible' : 'hidden')};
    }
  }
  @media (min-width: 768px) and (max-width: 992px) {
    .ant-form > .ant-row > .ant-col:nth-child(n + 7) {
      display: ${({ isShow = true }) => (isShow ? '' : 'none')};
    }
    .ant-col > .ant-btn {
      visibility: ${({ formItemNumber = 7 }) => (formItemNumber > 6 ? 'visible' : 'hidden')};
    }
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    .ant-form > .ant-row > .ant-col:nth-child(n + 10) {
      display: ${({ isShow = true }) => (isShow ? '' : 'none')};
    }
    .ant-col > .ant-btn {
      visibility: ${({ formItemNumber = 10 }) => (formItemNumber > 9 ? 'visible' : 'hidden')};
    }
  }

  @media (min-width: 1200px) and (max-width: 1600px) {
    .ant-form > .ant-row > .ant-col:nth-child(n + 10) {
      display: ${({ isShow = true }) => (isShow ? '' : 'none')};
    }
    .ant-col > .ant-btn {
      visibility: ${({ formItemNumber = 10 }) => (formItemNumber > 9 ? 'visible' : 'hidden')};
    }
  }

  @media (min-width: 1600px) {
    .ant-form > .ant-row > .ant-col:nth-child(n + 13) {
      display: ${({ isShow = true }) => (isShow ? '' : 'none')};
    }
    .ant-col > .ant-btn {
      visibility: ${({ formItemNumber = 13 }) => (formItemNumber > 12 ? 'visible' : 'hidden')};
    }
  }

  .singleRowSearchForm > .ant-row > .ant-col > .ant-form-item {
    @media (min-width: 992px) {
      margin-bottom: 0 !important;
    }
  }
`
