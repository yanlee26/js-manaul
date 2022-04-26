import { storiesOf } from '@storybook/react'
import { Modal } from 'antd'
import React from 'react'
import { onConfirm, onWarning } from '../onModal'
import { ModalButton } from './index'

storiesOf('Only-UI | ModalButton', module).add('default', () => {
  return (
    <ModalButton
      type="primary"
      render={({ visible, onClose }) => (
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={() =>
            onConfirm({
              title: 'confirm',
              onOk: onClose
            })
          }
          onCancel={() =>
            onWarning({
              title: 'warning',
              onOk: onClose
            })
          }
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      )}
    >
      弹窗按钮
      {/* <h1>弹窗按钮</h1> */}
    </ModalButton>
  )
})
