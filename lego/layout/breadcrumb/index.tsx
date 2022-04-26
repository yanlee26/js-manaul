import { pathnameRegExpMatch } from '@keukenhof/utils'
import { Breadcrumb } from 'antd'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export interface BreadcrumbItem {
  path: string
  breadcrumbName: string
  children?: React.ReactChild
  isNoAllowClick?: boolean
}
export interface BreadcrumbType {
  hidden: boolean
  items: BreadcrumbItem[]
}

export interface BreadcrumbProps {
  breadcrumbMap?: Map<string, BreadcrumbType>
}

const OnlyBreadcrumb = ({ breadcrumbMap }: BreadcrumbProps) => {
  const pathname = window.location.pathname
  const navigate = useNavigate()

  const data = useMemo(() => {
    if (!breadcrumbMap) return

    const pathKey = Array.from(breadcrumbMap.keys()).find((key: string) => pathnameRegExpMatch(key, pathname))

    if (pathKey) {
      return breadcrumbMap.get(pathKey)
    }

    return
  }, [pathname])

  return (
    <div>
      {data && !data.hidden && (
        <Breadcrumb>
          {data.items.map((item: BreadcrumbItem, index: number) => {
            const { path, breadcrumbName, children, isNoAllowClick } = item
            const len = data.items.length
            const goPath = () => {
              const next = path.includes(':') ? index - len + 1 : path
              navigate(next as string)
            }
            return (
              <Breadcrumb.Item key={path}>
                {children}
                {len - 1 === index || isNoAllowClick ? (
                  <span>{breadcrumbName}</span>
                ) : (
                  <a onClick={goPath}>{breadcrumbName}</a>
                )}
              </Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
      )}
    </div>
  )
}

export { OnlyBreadcrumb }
