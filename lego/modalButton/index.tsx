import { Button, ButtonProps } from 'antd'
import React, { useState } from 'react'

type RenderParam = {
  visible: boolean
  onClose: () => void
}
interface Props extends ButtonProps {
  render: (params: RenderParam) => React.ReactNode
}

export const ModalButton = ({ render, children, ...rest }: Props) => {
  const [visible, setVisible] = useState(false)
  const [init, setInit] = useState(false)
  const showModal = () => {
    setVisible(true)
    setInit(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  return (
    <>
      <Button onClick={showModal} {...rest}>
        {children}
      </Button>
      {init && render({ visible, onClose })}
    </>
  )
}
