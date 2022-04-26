import styled from 'styled-components'
import { colorBlue } from '../styled'

export const StyAlertWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background: ${colorBlue};
  .content,
  .download {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }
  .download {
    position: absolute;
    right: 24px;
  }
`
export const StyChildrenWrap = styled.div<{ height: string }>`
  height: calc(100% - 60px);
  > * {
    height: 100%;
  }
`
