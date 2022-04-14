import { useState } from 'react'

export function useToggle(initialValue = false) {
  const [visible, setVisible] = useState<boolean>(initialValue)
  function toggle(status?: boolean) {
    const newStatus = typeof status === 'boolean' ? status : !visible
    setVisible(newStatus)
  }
  return { visible, toggle }
}
