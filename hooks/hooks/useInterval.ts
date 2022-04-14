import { useEffect, useRef } from 'react'

export function useInterval(callback: Function, delay: number) {
  const callbackCached = useRef<Function>()

  if (!callbackCached.current) {
    callbackCached.current = callback
  }

  useEffect(() => {
    function tick() {
      callbackCached.current && callbackCached.current()
    }
    // clear interval when delay's 0
    if (delay) {
      const id = setTimeout(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
