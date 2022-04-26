import { storiesOf } from '@storybook/react'
import React from 'react'
import { LoginForm } from './LoginForm'

storiesOf('Only-UI | LoginForm', module).add('LoginForm', () => {
  function setIsReset() {
    console.log(1)
  }

  return (
    <>
      <LoginForm setIsReset={setIsReset} />
    </>
  )
})
