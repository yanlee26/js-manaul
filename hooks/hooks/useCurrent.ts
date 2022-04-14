import { useRef, useEffect } from 'react'

export function useCurrent<T = any>(value: T) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
