import { useAddUniqueTag } from '@keukenhof/hooks'
import { MenuList } from '@keukenhof/interface'
import { pathnameRegExpMatch } from '@keukenhof/utils'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
// import { CustomIcon } from 'components/customIcon'
import { TagsViewProps } from '../tagView'

const { SubMenu, Item } = Menu
const ExcludedPaths = ['/workbench/clue/detail']
export interface MenuContainerProps extends Pick<TagsViewProps, 'addTag'> {
  selectGlobal: (state: any) => any
  menuList: MenuList
  menuIconMap?: Map<string, any>
}

const findPaths = (menuList: MenuList) => (pathName: string): string[] => {
  let pathNameList: string[] = []
  const find = (list: MenuList, paths: string[]): boolean =>
    list.some(item => {
      const { path, children } = item
      const _paths = [...paths, path]
      if (pathnameRegExpMatch(path, pathName)) {
        pathNameList = _paths
        return true
      }
      if (children) {
        return find(children, _paths)
      }
      return false
    })

  find(menuList, [])

  return pathNameList
}

export const MenuContainer = ({ selectGlobal, menuList, menuIconMap, addTag }: MenuContainerProps) => {
  const { addUniqueTag } = useAddUniqueTag()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { collapsed } = useSelector(selectGlobal)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const getPaths = findPaths(menuList)
  const getTitle = (menu: MenuList[0]) => {
    if (!menuIconMap) {
      return (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <span>{menu.label}</span>
        </span>
      )
    }

    const MenuIcon = menuIconMap.get(menu.icon || menu.path)
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {MenuIcon && (
          <span className="anticon" style={{ marginRight: 0 }}>
            <MenuIcon />
          </span>
        )}
        <span>{menu.label}</span>
      </span>
    )
  }

  const onMenuClick = (menu: MenuList[0]) => {
    if (menu.path === pathname) return
    const { key: id, label, path } = menu
    const tag = {
      id,
      label,
      path,
      closable: true
    }

    dispatch(addTag(tag))
    addUniqueTag(tag)
    navigate(path)
  }

  useEffect(() => {
    const [openKey, selectedKey] = getPaths(pathname)
    const keys = collapsed ? [] : [openKey]
    // 没有二级菜单则直接选当前菜单
    setSelectedKeys([selectedKey || openKey])
    setOpenKeys(keys)
  }, [collapsed, pathname])

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => !openKeys.includes(key))
    setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
  }

  return (
    <Menu mode="inline" theme="dark" selectedKeys={selectedKeys} openKeys={openKeys} onOpenChange={onOpenChange}>
      {menuList?.map(menu =>
        menu.children ? (
          <SubMenu key={menu.path} title={getTitle(menu)}>
            {menu.children.map(child =>
              ExcludedPaths.includes(child.path) ? null : (
                <Item key={child.path} onClick={() => onMenuClick(child)}>
                  {child.label}
                </Item>
              )
            )}
          </SubMenu>
        ) : (
          <Item key={menu.path} onClick={() => onMenuClick(menu)}>
            {getTitle(menu)}
          </Item>
        )
      )}
    </Menu>
  )
}
