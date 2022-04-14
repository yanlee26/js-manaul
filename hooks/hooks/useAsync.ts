import { useCallback, useEffect, useState } from 'react'

interface ServiceFunc {
  (...params: any): Promise<any>
}

export function useFetchOnMounted<Result>(service: ServiceFunc, params: any = null, initialValue = {}) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Result>(initialValue as Result)

  useEffect(() => {
    async function getList() {
      setLoading(true)
      try {
        const { data } = await service(params)
        setData(data)
      } catch (error) {
        console.log('error')
        setLoading(false)
      }
    }

    getList()
  }, [params, service])

  return { loading, data }
}

type OptionsType = {
  autoRun?: boolean
  params?: null | any
}
export function useAsync<T>(
  fn: ServiceFunc,
  initialData = {} as T,
  options: OptionsType = { autoRun: true, params: null }
) {
  const [data, setData] = useState<T>(initialData)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const autoRun = 'autoRun' in options ? options.autoRun : true
  const params = options.params
  const memoizedCallback = useCallback(
    async (params = null) => {
      try {
        setIsLoading(true)
        const { data: value, success } = await fn(params)
        setIsSuccess(success)
        setError(null)
        setData(value || initialData)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setIsSuccess(false)
        setData(initialData || ({} as T))
        setError(error)
      }
    },
    // eslint-disable-next-line
    [fn]
  )
  useEffect(() => {
    if (autoRun) {
      memoizedCallback(params)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRun, memoizedCallback])

  return { error, isLoading, isSuccess, data, fetch: memoizedCallback }
}
