import { MenuList, TrueOrFalse } from '@keukenhof/interface'
import { Layout, Spin } from 'antd'
import React, { ReactNode, Suspense, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { ONLY_CND_CONFIG } from '../assets'
import { DASHBOARD_PATH } from '../constant'
import { ONLY_TOKEN } from '../ProjectGateway/config'
import { BreadcrumbProps, OnlyBreadcrumb } from './breadcrumb'
import { HeaderContainer } from './header'
import { MenuContainer, MenuContainerProps } from './menu'
import { LayoutContainer } from './style'
import TagsView, { TagsViewProps } from './tagView'

export const FallbackLoading = () => {
  return <Spin tip="加载中..."></Spin>
}

const { logo, logoName } = ONLY_CND_CONFIG

const { Sider, Content } = Layout
const WIDTH = 992

interface ComponentProps {
  callCenter?: ReactNode
  clueFollowModal?: ReactNode
}

interface LayoutPageProps
  extends TagsViewProps,
    BreadcrumbProps,
    Pick<MenuContainerProps, 'selectGlobal' | 'menuIconMap'>,
    ComponentProps {
  menuListMock?: MenuList
  showProjectShiftMenu?: boolean
  showChangeDepartment?: boolean
  rootPath?: string
  logoutAsync: () => void
  setIsFirstTimeLogin: (status: TrueOrFalse) => void
  setGlobalCollapsed: (o: { collapsed: boolean }) => void
  loginAsync: (options: any) => any
}
export const LayoutPage = ({
  selectUser,
  selectTagView,
  selectGlobal,
  menuIconMap,
  breadcrumbMap,
  menuListMock,
  showProjectShiftMenu = true,
  rootPath = DASHBOARD_PATH,
  showChangeDepartment = true,
  setIsFirstTimeLogin,
  setGlobalCollapsed,
  setActiveTag,
  removeTag,
  removeAllTag,
  removeOtherTag,
  addTag,
  initTags,
  logoutAsync,
  loginAsync,
  callCenter,
  clueFollowModal
}: LayoutPageProps) => {
  const { collapsed } = useSelector(selectGlobal)
  const { menuList } = useSelector(selectUser)

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const query = new URLSearchParams(location.search)
  const token = useRef(query.get(ONLY_TOKEN))

  useEffect(() => {
    const tokenFromStore = token.current
    if (tokenFromStore) return
    if (location.pathname === '/') {
      navigate(`/login`)
    }
  }, [location.pathname, token])

  useEffect(() => {
    async function getPermissionsByToken(token: string) {
      localStorage.setItem('token', token)

      const res = await dispatch(loginAsync({ token }))
      if (!res) {
        return
      }

      const pathName = location.pathname
      if (pathName === '/') {
        const from = { pathname: rootPath }
        navigate(from)
        return
      }

      if (query.has(ONLY_TOKEN)) {
        query.delete(ONLY_TOKEN)
      }

      if (!query.toString()) {
        navigate(pathName)
        return
      }

      const queryStr = query.toString()
      navigate(`${pathName}?${queryStr}`)
    }

    token.current && getPermissionsByToken(token.current)

    return () => {
      token.current = null
    }
  }, [token])

  useEffect(() => {
    window.onresize = () => {
      const rect = document.body.getBoundingClientRect()
      const needCollapse = rect.width < WIDTH
      dispatch(
        setGlobalCollapsed({
          collapsed: needCollapse
        })
      )
    }
  }, [])

  const toggle = () => {
    dispatch(
      setGlobalCollapsed({
        collapsed: !collapsed
      })
    )
  }
  const menu = process.env.NODE_ENV === 'development' ? menuListMock || menuList : menuList

  return (
    <LayoutContainer>
      <Sider className="layout-page-sider" trigger={null} collapsible collapsed={collapsed} breakpoint="md">
        <div className="logo">
          <img src={logo} alt="img" />
          {!collapsed && <img src={logoName} alt="img" />}
        </div>
        <MenuContainer selectGlobal={selectGlobal} menuList={menu} menuIconMap={menuIconMap} addTag={addTag} />
      </Sider>
      <Layout>
        <HeaderContainer
          collapsed={collapsed}
          showChangeDepartment={showChangeDepartment}
          showProjectShiftMenu={showProjectShiftMenu}
          selectUser={selectUser}
          toggle={toggle}
          setIsFirstTimeLogin={setIsFirstTimeLogin}
          logoutAsync={logoutAsync}
          callCenter={callCenter}
        />

        <Content className="layout-page-content">
          <TagsView
            selectUser={selectUser}
            selectTagView={selectTagView}
            setActiveTag={setActiveTag}
            removeTag={removeTag}
            removeOtherTag={removeOtherTag}
            removeAllTag={removeAllTag}
            addTag={addTag}
            initTags={initTags}
          />
          <OnlyBreadcrumb breadcrumbMap={breadcrumbMap} />
          <Suspense fallback={<FallbackLoading />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
      {clueFollowModal}
    </LayoutContainer>
  )
}
