import styled from 'styled-components'
import CheckIcon from '../assets/common/check.svg'

export const StyPopCheckboxWrap = styled.div`
  width: 530px;
  margin-left: -22px;
  .ant-checkbox-wrapper {
    position: relative;
    margin: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 90px;
    height: 22px;
    color: #556675;
    font-size: 12px;
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid #cfd3d8;
    .ant-checkbox {
      position: absolute;
      right: 0px;
      top: 10px;
      .ant-checkbox-inner {
        width: 10px;
        height: 10px;
        border: none;
        background-color: transparent;
      }
      &.ant-checkbox-checked {
        user-select: none;
        .ant-checkbox-inner {
          &::before {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            border: 5px solid rgba(24, 144, 255, 1);
            border-left-color: transparent;
            border-top-color: transparent;
          }
          &::after {
            width: 100%;
            border-width: 0;
            background: url(${CheckIcon}) 2px 0% no-repeat;
            transform: none;
          }
        }
        &::after {
          border-left-color: transparent;
          border-top-color: transparent;
        }
      }
    }
    &.ant-checkbox-wrapper-disabled {
      background: #f3f4f5;
      &.ant-checkbox-disabled + span {
        color: #556675;
      }
    }
    &.ant-checkbox-wrapper-checked {
      color: rgba(24, 144, 255, 1);
      border-color: rgba(24, 144, 255, 1);
      background-color: rgba(24, 144, 255, 0.15);
    }
  }
`
