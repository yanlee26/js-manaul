import { storiesOf } from '@storybook/react'
import React from 'react'
import { TestCustomForm } from './test'

storiesOf('components', module).add('CustomForm', () => {
  return <TestCustomForm />
})
