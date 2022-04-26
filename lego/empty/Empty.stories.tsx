import { storiesOf } from '@storybook/react'
import { message } from 'antd'
import React from 'react'
import { CustomizeRenderEmpty, WithEmpty } from './index'

const arr = ['1', '2', '3', '4', '5']
storiesOf('Only-UI | Empty', module).add('WithEmpty', () => {
  return (
    <>
      <WithEmpty data={arr}>
        <>
          {arr.map(x => (
            <div key={x}>{x}</div>
          ))}
        </>
      </WithEmpty>
      <hr />
      <WithEmpty data={arr.slice(8)}>{arr.length}</WithEmpty>
    </>
  )
})

storiesOf('Only-UI | Empty', module).add('CustomizeRenderEmpty', () => {
  function action() {
    message.success('ok')
  }
  return (
    <>
      <CustomizeRenderEmpty action={action}></CustomizeRenderEmpty>
    </>
  )
})
