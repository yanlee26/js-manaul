import { RowKeys } from 'interface'
import { useState } from 'react'

// https://ant.design/components/table-cn/#rowSelection
export function useRowSelect<T = any>(
  type: 'checkbox' | 'radio' | undefined = 'checkbox',
  selectedKeys: RowKeys = [],
  slectedRows: T[] = [],
  setRemovedKey?: (key: number) => void
) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<RowKeys>(selectedKeys)
  const [selectedRows, setSelectedRows] = useState<T[]>(slectedRows)
  // 兼容其它配置
  const rowSelection: any = {
    type,
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect
    // getCheckboxProps: (record: T) => {}
  }

  function onSelect(record: T, selected: boolean, selectedRows: T[]) {
    if (!selected && setRemovedKey) {
      // @ts-ignore
      setRemovedKey(record.id)
    }
  }

  function onSelectChange(selectedRowKeys: RowKeys, rows: T[]) {
    setSelectedRowKeys(selectedRowKeys)
    setSelectedRows(rows)
  }

  async function onReset() {
    onSelectChange(selectedKeys, slectedRows)
  }

  async function setSelectedRowsReactively(rows: T[], prop: keyof T = 'id' as keyof T) {
    onSelectChange(
      rows.map((x: any) => x[prop]),
      rows
    )
  }

  return {
    rowSelection,
    selectedRowKeys,
    selectedRows,
    setSelectedRowKeys,
    setSelectedRows,
    onSelectChange,
    setSelectedRowsReactively,
    onReset
  }
}
