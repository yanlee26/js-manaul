import { storiesOf } from '@storybook/react'
import React from 'react'
import { AlertOfUserAgent } from './index'

storiesOf('Only-UI | AlertOfUserAgent', module).add('default', () => {
  return (
    <AlertOfUserAgent>
      <div>test</div>
    </AlertOfUserAgent>
  )
})
