import { usePrevious, useSessionStorageOfTags } from '@keukenhof/hooks'
import { MenuChild } from '@keukenhof/interface'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { OnlyTabs } from '../../onlyTabs'
import { TagViewContainer } from '../style'
import { TagsViewAction } from './TagsViewAction'

const { TabPane } = OnlyTabs

// DFS
function findMenu(menuList: MenuChild[], pathname: string): MenuChild | any {
  for (const item of menuList) {
    if (item.path === pathname) {
      return item
    }

    if (item.children?.length) {
      const menu = findMenu(item.children, pathname)
      if (menu) return menu
    }
  }
  return null
}

export interface TagsViewProps {
  selectUser: (state: any) => any
  selectTagView: (state: any) => any
  removeTag: (key: string) => void
  addTag: (o: any) => void
  removeOtherTag: () => void
  removeAllTag: () => void
  setActiveTag: (key: string) => void
  initTags: (o: any) => void
}
const TagsView = ({
  selectTagView,
  selectUser,
  setActiveTag,
  removeTag,
  addTag,
  initTags,
  removeAllTag,
  removeOtherTag
}: TagsViewProps) => {
  const [localTags, setTags] = useSessionStorageOfTags()
  const { menuList = [] } = useSelector(selectUser)
  const { tags, activeTagId } = useSelector(selectTagView)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const prevActiveTagId = usePrevious(activeTagId)

  const onChangeTag = (key: string) => {
    dispatch(setActiveTag(key))
  }

  const onRemove = (targetKey: string) => {
    dispatch(removeTag(targetKey))
    setTags(localTags.filter(x => x.id !== targetKey))
  }

  const onRemoveCurrent = () => {
    onRemove(activeTagId)
  }

  const onRemoveAll = () => {
    dispatch(removeAllTag())
    setTags([])
  }

  const onRemoveOther = () => {
    dispatch(removeOtherTag())
    setTags(localTags.filter(x => x.id === activeTagId))
  }

  // 处理存储中的 tags, 只处理菜单内返回的数据
  useEffect(() => {
    dispatch(initTags(localTags))
  }, [])

  // 仅处理menuList 能匹配到的 tag, 且只在 mounted 时执行
  useEffect(() => {
    if (menuList.length) {
      const menu = findMenu(menuList, pathname)
      if (!menu) {
        // TODO: 复杂路由跳转的 原生返回 临时处理
        let key = ''
        if (pathname === '/course/detail') {
          key = 'list/live'
        }
        if (pathname === '/teaching/class/detail') {
          key = 'class/live'
        }
        if (pathname === '/course/record-detail') {
          key = 'list/record'
        }
        if (/\/teaching\/class\/recordingClass\/detail/.test(pathname)) {
          key = 'class/record'
        }
        if (key && activeTagId !== key) {
          dispatch(setActiveTag(key))
        }

        return
      }
      const tag = {
        path: menu.path,
        label: menu.label,
        id: menu.key,
        closable: true
      }
      dispatch(addTag(tag))
      dispatch(setActiveTag(menu.key))
    }
  }, [menuList, pathname])

  useEffect(() => {
    // If current tag id changed, push to new path.
    if (!tags.length) return
    if (prevActiveTagId !== activeTagId) {
      const { params, ...tag } = tags.find((tag: any) => tag.id === activeTagId) || tags[0]
      // force navigate
      if (params) {
        navigate(tag.path + search, params)
      } else {
        navigate(tag.path + search)
      }
    }
  }, [activeTagId, prevActiveTagId, tags, search])

  return (
    <TagViewContainer id="pageTabs">
      <OnlyTabs
        type="editable-card"
        hideAdd
        tabBarStyle={{ margin: 0 }}
        activeKey={activeTagId}
        onEdit={(targetKey, action) => action === 'remove' && onRemove(targetKey as string)}
        onChange={onChangeTag}
        tabBarExtraContent={
          <TagsViewAction onRemoveCurrent={onRemoveCurrent} onRemoveAll={onRemoveAll} onRemoveOther={onRemoveOther} />
        }
      >
        {tags.map((tag: any) => (
          <TabPane tab={tag.label} key={tag.id} closable={tag.closable} />
        ))}
      </OnlyTabs>
    </TagViewContainer>
  )
}

export default TagsView
