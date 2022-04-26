import {
  CalendarOutlined,
  DesktopOutlined,
  DownOutlined,
  HddOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { TrueOrFalse } from '@keukenhof/interface'
import { Button, Dropdown, Menu } from 'antd'
import React, { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ONLY_CND_CONFIG } from '../../assets'
import { links, ONLY_TOKEN } from '../../ProjectGateway/config'
import { LayoutHeader, StyledMenuItem } from '../style'
import { ChangeDepartment } from './changeDepartment'
import { TweakPasswordModal } from './TweakPasswordModal'

export const loginPath = `/login`
const { avator: avatorPNG } = ONLY_CND_CONFIG
const defaultLinkItem = links.find(x => x.value === location.origin) || links[0]
interface HeaderContainerProps {
  collapsed: boolean
  showProjectShiftMenu?: boolean
  showChangeDepartment?: boolean
  callCenter?: ReactNode
  selectUser: (state: any) => any
  toggle: () => void
  logoutAsync: () => any
  setIsFirstTimeLogin: (status: TrueOrFalse) => void
}
const IconsMap = new Map<string, ReactNode>([
  ['wp', <DesktopOutlined key="wp" />],
  ['crm', <TeamOutlined key="crm" />],
  ['cms', <HddOutlined key="cms" />],
  ['os', <CalendarOutlined key="os" />]
])

enum ActionEnum {
  Logout = 'logout',
  TweakPsw = 'tweakPsw'
}

export const HeaderContainer = ({
  collapsed,
  selectUser,
  showProjectShiftMenu,
  showChangeDepartment = true,
  toggle,
  logoutAsync,
  setIsFirstTimeLogin,
  callCenter
}: HeaderContainerProps) => {
  const { logged, nickName, userId, isFirstTimeLogin: isFirstTimeLoginFromStore, token } = useSelector(selectUser)
  // NOTE 实时性：优先取 localStore 里的
  const isFirstTimeLoginFromLocal = localStorage.getItem('isFirstTimeLogin')
  const eitherToken = localStorage.getItem('token') ?? token
  const isFirstTimeLogin = isFirstTimeLoginFromLocal !== null ? +isFirstTimeLoginFromLocal : isFirstTimeLoginFromStore

  const [visible, setVisible] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 需要同步变化
  useEffect(() => {
    setVisible(!!isFirstTimeLogin)
  }, [isFirstTimeLogin])

  const onActionClick = async (action: ActionEnum) => {
    switch (action) {
      case ActionEnum.TweakPsw:
        setVisible(true)
        break
      case ActionEnum.Logout: {
        const res = await dispatch(logoutAsync())
        res && navigate(loginPath)
        break
      }
      default: {
        break
      }
    }
  }

  function onTweakSuccess() {
    // 更新数据
    localStorage.setItem('isFirstTimeLogin', '0')
    setVisible(false)
    dispatch(setIsFirstTimeLogin(0))
  }

  const toLogin = () => {
    navigate(loginPath)
  }

  const projectMenu = (
    <Menu>
      {links.map(({ key, value, title }, i) => (
        <Menu.Item key={key} icon={IconsMap.get(key)}>
          <a target="_blank" rel="noopener noreferrer" href={`${value}?${ONLY_TOKEN}=${eitherToken}`}>
            {title}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  )

  const menu = (
    <Menu>
      <StyledMenuItem key="1">
        <span onClick={() => onActionClick(ActionEnum.TweakPsw)}>
          <LockOutlined />
          <span>修改密码</span>
        </span>
      </StyledMenuItem>
      <StyledMenuItem key="2">
        <span onClick={() => onActionClick(ActionEnum.Logout)}>
          <LogoutOutlined />
          <span>退出</span>
        </span>
      </StyledMenuItem>
    </Menu>
  )

  return (
    <LayoutHeader>
      <div className="layout-page-header-main">
        <div>
          <span id="sidebar-trigger" onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
          {showProjectShiftMenu && (
            <Dropdown arrow overlay={projectMenu}>
              <Button size="middle">
                {IconsMap.get(defaultLinkItem.key)} {defaultLinkItem.title}
                <DownOutlined />
              </Button>
            </Dropdown>
          )}
        </div>
        {callCenter}
        <div className="actions">
          {showChangeDepartment && <ChangeDepartment />}
          {logged ? (
            <Dropdown overlay={menu} trigger={['click']}>
              <span className="user-action">
                <img src={avatorPNG} alt="Avator" className="user-avator" />
                <span className="nick-name">{nickName}</span>
              </span>
            </Dropdown>
          ) : (
            <span className="login" onClick={toLogin}>
              登陆
            </span>
          )}
        </div>
      </div>
      <TweakPasswordModal
        userId={userId}
        visible={visible}
        closable={!isFirstTimeLogin}
        isFirstTimeLogin={!!isFirstTimeLogin}
        setVisible={setVisible}
        onSuccess={onTweakSuccess}
      />
    </LayoutHeader>
  )
}
