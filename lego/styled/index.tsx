import styled from 'styled-components'

export * from './Column'
export * from './common-styled'
export * from './Container'
export * from './Flex'
export * from './Header'
export * from './onlySearchCard'
export * from './StatusContainer'
export * from './StyledModalWithModalWrap'
export * from './StyledOperation'

export const StyBgWrap = styled.div`
  padding: 24px 24px 8px 24px;
  margin-bottom: 24px;
  background: #f7f9fb;
`
export const StyFilterWrap = styled<any>(StyBgWrap)`
  .filter-item {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 16px;
    .label-wrap {
      margin-left: -12px;
      min-width: 110px;
      font-size: 14px;
      text-align: right;
      color: #0d1a26;
      white-space: nowrap;
    }
    > div {
      flex: 1;
    }
    > button {
      margin-left: 12px;
    }
  }
`
export const ResponsiveImageContainer = styled.div`
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
`
