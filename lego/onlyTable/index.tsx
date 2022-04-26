import { bytesCount } from '@keukenhof/utils'
import { Table, Tooltip } from 'antd'
import { ColumnType, TableProps } from 'antd/lib/table'
import React from 'react'
import styled from 'styled-components'
import { textEllipsis2 } from '../styled'

const OCCUPY_STRING = '-'
const keyWords: { word: string; buffer: number }[] = [
  { word: '时间', buffer: 13 },
  { word: '日期', buffer: 13 },
  { word: '有效期', buffer: 13 },
  { word: '年级', buffer: 2 },
  { word: '学科', buffer: 2 },
  { word: '老师', buffer: 20 }
]

const StyOnlyTable = styled(Table)`
  color: #556675;
  .ant-table {
    .ant-table-sticky-scroll {
      display: none;
    }
    .ant-table-thead {
      tr {
        th {
          padding: 12px 4px 12px 24px;
          color: #0d1a26;
          background: #f7f9fb;
          font-weight: normal;
          &.ant-table-selection-column {
            padding: 12px 6px;
          }
        }
      }
    }
    .ant-table-tbody {
      tr {
        &:hover {
          > td {
            background: #f7f9fb;
          }
        }
        td.ant-table-cell {
          padding: 12px 4px 12px 24px;
          color: #556675;
          &.ant-table-selection-column {
            padding: 12px 6px;
          }
          span.text-ellipsis-wrap {
            display: -webkit-box;
            white-space: normal;
          }
        }
      }
    }
    .ant-table-expanded-row-fixed {
      margin: -12px -4px -12px -24px;
    }
  }
`
const StyOverText = styled.span`
  ${textEllipsis2()}
`

interface OnlyTableProps<T = any> extends TableProps<T> {
  maxTextWidth?: number
  maxLength?: number
  isNeedResetWidth?: boolean
}

interface OnlyColumnType extends ColumnType<Record<string, any>> {
  isRewriteRender?: boolean
}

interface OverTextProps {
  txt: string
  container?: HTMLElement
}

const OverText = ({ txt, container }: OverTextProps) => (
  <Tooltip
    destroyTooltipOnHide
    placement="topLeft"
    title={txt}
    overlayStyle={{ maxWidth: 320 }}
    getPopupContainer={trigger => (container ? container : trigger.parentElement!)}
  >
    <StyOverText className="text-ellipsis-wrap">{txt}</StyOverText>
  </Tooltip>
)

const setOccupyString = (data: string | null) => (data === null || data === '' ? OCCUPY_STRING : data)

const handleEmpty = (itemData: any, item: any) => {
  const renderFunc = item.render
  if ((itemData === null || itemData === '') && !renderFunc) {
    item.render = (value: any) => setOccupyString(value)
  }
}

const handleTextOverMaxLength = ({ textLength, maxLength, maxTextWidth }, item: any) => {
  if (textLength < maxLength / 2) return

  if (textLength >= maxLength / 2) {
    item.width = maxTextWidth
  }

  if (textLength < maxLength) return
  const container = document.body
  const renderFunc = item.render
  item.render = (value, record, index) =>
    renderFunc ? (
      renderFunc(<OverText txt={setOccupyString(value)} container={container}></OverText>, record, index)
    ) : (
      <OverText txt={setOccupyString(value)} container={container}></OverText>
    )
  item.isRewriteRender = true
  return
}
const makeWidth = (item: OnlyColumnType, isNeedReset: boolean, getLength: (item: OnlyColumnType) => number) => {
  if (!isNeedReset) return
  item.width = getLength(item) * 7 + 30
}
const getBuffer = (str: string): number => {
  for (const { word, buffer } of keyWords) {
    if (str.includes(word)) {
      return buffer
    }
  }
  return 0
}
const getSorterBuffer = (hasSorter: boolean): number => (hasSorter ? 3 : 0)

export const OnlyTable = ({
  maxTextWidth = 260,
  maxLength = 60,
  isNeedResetWidth = false,
  ...rest
}: OnlyTableProps) => {
  const { columns = [], dataSource = [] } = rest

  columns.forEach((item: OnlyColumnType) => {
    let maxTextLength = 0
    const hasSetWidth = isNeedResetWidth && !Boolean(item.width)
    const isNeedReset = typeof item.title === 'string' && hasSetWidth
    makeWidth(item, isNeedReset, item => {
      maxTextLength =
        bytesCount(item.title as string) + getBuffer(item.title as string) + getSorterBuffer(!!item.sorter)
      return maxTextLength
    })

    dataSource.forEach((data: Record<string, unknown>) => {
      if (typeof item.dataIndex !== 'string' || item.isRewriteRender) return

      const itemData = data[item.dataIndex]
      handleEmpty(itemData, item)

      if (typeof itemData !== 'string') return

      const textLength = bytesCount(itemData)

      makeWidth(item, hasSetWidth, () => {
        maxTextLength = Math.min(Math.max(maxTextLength, textLength), maxLength / 2)
        return maxTextLength
      })

      handleTextOverMaxLength({ textLength, maxLength, maxTextWidth }, item)
    })
  })
  return <StyOnlyTable scroll={{ x: 'max-content' }} {...rest} />
}
