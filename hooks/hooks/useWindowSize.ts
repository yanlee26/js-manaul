import { useEffect, useState } from 'react'

export const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight])
  useEffect(() => {
    const handleWindowSize = () => setSize([window.innerWidth, window.innerHeight])
    window.addEventListener('resize', handleWindowSize)
  }, [])
  return size
}
