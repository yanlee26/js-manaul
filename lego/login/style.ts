import styled from 'styled-components'
import { ONLY_CND_CONFIG } from '../assets'
export * from 'antd'

const { login: loginBg, logoFull } = ONLY_CND_CONFIG

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url(${loginBg});
  background-size: 100% 101%; // 图片有小白边
  background-position: center;
  background-repeat: no-repeat;
  form {
    width: 400px;
    // height: 424px;
    padding: 60px 50px;
    background: rgba(255, 255, 255, 0.59);
    border-radius: 20px;
    .only-edu-bg {
      width: 221px;
      height: 60px;
      margin: 0 auto 60px auto;
      background: url(${logoFull});
      background-size: contain;
      background-repeat: no-repeat;
    }
    .ant-form-item input {
      width: 300px;
      height: 40px;
      background: #ffffff;
      border-radius: 2px;
      font-size: 16px;
      color: #9ea8b1;
      line-height: 28px;
    }
    .ant-form-item:last-child {
      margin-bottom: 0;
    }
  }
  .login-page-form_button {
    width: 100%;
    height: 40px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 24px;
    font-weight: 700;
  }
  .login-tail {
    height: 14px;
  }
  .login-tail .ant-form-item-control-input-content {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    margin-top: -20px;
    .ant-btn-link {
      padding: 0;
    }
  }

  .pwd-reset .ant-form-item-control-input-content {
    .ant-btn-link {
      padding: 0;
      &.with-underline span {
        text-decoration: underline;
      }
    }
  }
  .anticon {
    color: rgba(0, 0, 0, 0.25);
  }
  .site-form-item-icon {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.25);
    margin-right: 8px;
  }
  h3 {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: #0d1a26;
    margin-bottom: 24px;
  }
  .close {
    width: 110%;
    text-align: right;
    margin-top: -40px;
  }
  .custom-form-item {
    margin-bottom: 0;
  }
`
