import { storiesOf } from '@storybook/react'
import React from 'react'
import { FormItemStyle } from './index'

storiesOf('Only-UI | FormItemStyle', module).add('FormItemStyle', () => {
  return (
    <>
      <FormItemStyle label="FormItemStyle" required>
        FormItemContent
      </FormItemStyle>
    </>
  )
})
