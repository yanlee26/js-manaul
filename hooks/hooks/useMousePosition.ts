import { useEffect, useState } from 'react'

export const useMousePosition = (defaultPosition = [0, 0]) => {
  const [position, setPosition] = useState(defaultPosition)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setPosition([e.clientX, e.clientY])
    window.addEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}
