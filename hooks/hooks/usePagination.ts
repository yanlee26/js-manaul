import { FormInstance } from 'antd/lib/form'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import { SearchProps } from 'interface'
import { useCallback, useEffect, useState } from 'react'
import locale from 'antd/lib/locale/zh_CN'
import { PAGE_SIZE_OPTIONS } from 'config'

export interface PaginationProps extends TablePaginationConfig {
  setPageSize?: (pageSize: number) => void
  pageSize: number
  pageNum?: number
  total?: number
  defaultCurrent?: number
  setPageNum?: (pageNum: number) => void
}
export const INITIAL_NUM = 1
export const INITIAL_SIZE = 20
// read
export function usePagination({
  total,
  pageSize = INITIAL_SIZE,
  defaultCurrent = INITIAL_NUM,
  setPageNum,
  setPageSize
}: PaginationProps) {
  function onShowSizeChange(current: number, pageSize: number) {
    setPageSize!(pageSize)
  }

  const pagination = {
    showQuickJumper: true,
    total, // 多于一定数量才展示
    defaultCurrent,
    pageSize,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    showSizeChanger: true,
    onChange: setPageNum,
    onShowSizeChange
  }
  return {
    pagination
  }
}

// set
export function useGetSetPagination(initialNum = 1, initialSize = INITIAL_SIZE) {
  const [pageNum, setPageNum] = useState(initialNum)
  const [pageSize, setPageSize] = useState(initialSize)

  const resetPageNum = useCallback(() => {
    setPageNum(INITIAL_NUM)
  }, [])

  const resetPageSize = useCallback(() => {
    setPageSize(INITIAL_SIZE)
  }, [])

  const resetPageOptions = useCallback(() => {
    setPageNum(INITIAL_NUM)
    setPageSize(INITIAL_SIZE)
  }, [])

  return {
    pageNum,
    pageSize,
    resetPageNum,
    resetPageSize,
    resetPageOptions,
    setPageNum,
    setPageSize
  }
}

const isResetPageNum = true
// 通用列表页搜索
export function useCommonListPageFetch<Params, Result>(
  apiFetchFn: (data: Params) => any,
  initSearchParams: any = {},
  otherDeps: any = null,
  initData = {}
) {
  const [searchParams, setSearchParams] = useState<Params>(initSearchParams as Params)
  const [data, setData] = useState<Result>(initData as Result)
  const { pageNum, pageSize, setPageNum, setPageSize, resetPageOptions } = useGetSetPagination(
    initSearchParams.pageNum,
    initSearchParams.pageSize
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<boolean>(false)

  const pagination = {
    locale: locale.Pagination,
    showQuickJumper: true,
    // @ts-ignore
    total: data?.total, // 多于一定数量才展示,
    defaultCurrent: INITIAL_NUM,
    pageSize,
    pageNum,
    current: pageNum,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 条`,
    onChange: setPageNum,
    onShowSizeChange
  }

  function onShowSizeChange(current: number, pageSize: number) {
    setPageSize(pageSize)
  }

  function onResetSearchParams() {
    setSearchParams(initSearchParams)
  }

  useEffect(() => {
    async function getList(options: Params, pageNum: number, pageSize: number) {
      setLoading(true)
      try {
        const params = {
          ...options,
          pageSize,
          pageNum
        }
        const { data } = await apiFetchFn(params)
        setLoading(false)
        setData(data)
      } catch (e) {
        setLoading(false)
        setData(initData as Result)
        console.log(apiFetchFn, e)
      }
    }

    getList(searchParams, pageNum, pageSize)
  }, [searchParams, pageNum, pageSize])

  const memoSetSearchParams = useCallback(
    // 每次改变搜索参数，重置搜索页为当前页
    (params: Params, isResetPageNum = false) => {
      //NOTE： 重置与否
      if (isResetPageNum && params) {
        resetPageOptions()
      }
      setSearchParams(options => ({ ...options, ...params }))
    },
    []
  )

  const refreshList = () => {
    setRefresh(!refresh)
  }

  return {
    data,
    pagination,
    searchParams,
    pageNum,
    loading,
    setData,
    onResetSearchParams,
    setSearchParams,
    setPageSize,
    setPageNum,
    memoSetSearchParams,
    refreshList,
    resetPageOptions
  }
}

interface SearchOperationProps extends SearchProps {
  form: FormInstance
}
export function useSearchOperation<T = any>({ form, onSetSearchParams, onResetSearchParams }: SearchOperationProps) {
  async function onSearch() {
    try {
      const formData = await form.validateFields()
      onSetSearchParams(formData as T)
    } catch (e) {
      console.error('e: ', e)
    }
  }

  function onReset() {
    form.resetFields()
    onResetSearchParams()
  }

  return {
    onSearch,
    onReset
  }
}
