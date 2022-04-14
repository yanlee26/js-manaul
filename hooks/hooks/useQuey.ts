import { useCallback, useEffect, useState } from 'react'

export declare type Response<T = any, U = any> = {
  success: boolean
  message: string
  code: string | number
  data: T
  errors: U
}

export const useQuery = <T extends any, S>(
  params: T,
  callBack: (data: T) => Promise<Response<S, any>>,
  status?: boolean
): [S | null, any, boolean] => {
  const [response, setResponse] = useState<{
    loading: boolean
    data: S | null
    err: any
  }>({
    loading: true,
    data: null,
    err: null
  })
  const { loading, data, err } = response

  const getQueryMemo = useCallback(async () => {
    try {
      const { data } = await callBack(params)
      setResponse({
        loading: false,
        data,
        err: null
      })
    } catch (error) {
      setResponse({
        loading: false,
        data: null,
        err: error
      })
    }
  }, [params, status])
  useEffect(() => {
    getQueryMemo()
  }, [getQueryMemo])
  return [data, err, loading]
}
