import { Layout, Menu, Modal } from 'antd'
import styled from 'styled-components'

const { Header } = Layout

export const LayoutContainer = styled(Layout)`
  height: 100%;
  position: relative;

  .layout-page-sider {
    height: 100%;
    overflow-y: auto;
    background-color: #1a2c3e !important;
    box-sizing: border-box;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 64px;
      width: 100%;
      background: rgba(255, 255, 255, 0.2);
      img {
        margin: 0 4px;
        height: 30px;
      }
    }
    ul.ant-menu {
      min-height: calc(100% - 64px);
    }
  }
  .layout-page-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #fff;
    > :nth-child(1) .ant-tabs-bar {
      padding: 6px 0 0;
      background: #fff;
    }

    > :nth-child(2) .ant-breadcrumb {
      margin: 0 24px;
      padding: 18px 0 17px 0px;
      border-bottom: 1px solid #f0f0f0;
      color: #556675;

      span {
        color: #0d1a26;
        font-weight: bold;
        a {
          color: #556675;
          font-weight: normal;
          &:hover {
            color: #1890ff;
          }
        }
      }
    }

    > :nth-child(3) {
      flex: auto;
      overflow-y: auto;
      overflow-x: hidden;
      margin: 24px;
      /* padding: 10px 12px; */
      box-sizing: border-box;
      background-color: #ffffff;
      .ant-table-wrapper {
        border: 0;
        box-sizing: border-box;
      }

      .ant-form {
        // margin-bottom: 12px;
      }
      .innerText {
        background-color: #fff;
        padding: 24px;
        border-radius: 2px;
        display: block;
        line-height: 32px;
        font-size: 16px;
      }
    }
  }

  .layout-page-sider-menu {
    border-right: none !important;
  }
  .ant-menu-inline-collapsed {
    width: 79px !important;
  }

  .notice-description {
    font-size: 12px;
    &-datetime {
      margin-top: 4px;
      line-height: 1.5;
    }
  }

  .notice-title {
    display: flex;
    justify-content: space-between;
  }

  .user-action {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .user-avator {
    width: 40px;
    height: 40px;
  }
`

export const LayoutHeader = styled(Header)`
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9;
  .layout-page-header-main {
    background: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
  #sidebar-trigger {
    height: 64px;
    padding: 22px 24px;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s, padding 0s;
  }
  .layout-page-main {
    padding: 0 15px;
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
  .actions {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    .nick-name {
      margin-left: 12px;
      color: #314659;
    }
    .login {
      cursor: pointer;
      color: #d9d9d9;
    }
    .notice {
      display: block;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 22px;
      height: 22px;
      cursor: pointer;
      color: #d9d9d9;
    }
    img {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      margin-left: 12px;
      border-radius: 50%;
    }
  }
`

export const TagViewContainer = styled.div`
  background: '#fff';
  padding: '6px 4px';
`
export const StyledMenuItem = styled(Menu.Item)`
  &:hover {
    color: #1890ff;
    background: rgba(24, 144, 255, 0.15);
  }
  .ant-dropdown-menu-title-content {
    .anticon {
      min-width: 12px;
      margin-right: 8px;
      font-size: 12px;
      vertical-align: -0.1em;
    }
  }
`

export const StyledModal = styled(Modal)`
  &&& {
    .ant-input-password-icon {
      color: rgba(0, 0, 0, 0.25);
    }
  }
`
