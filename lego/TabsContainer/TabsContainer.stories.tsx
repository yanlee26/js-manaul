import { storiesOf } from '@storybook/react'
import React, { ReactChild } from 'react'
import { TabsContainer } from './index'

const tabs = new Map<string, { label: string; value: ReactChild }>([
  [
    '0',
    {
      label: '直播大班课',
      value: <div>live</div>
    }
  ],
  [
    '1',
    {
      label: '录播课',
      value: <div>record</div>
    }
  ]
])

storiesOf('Only-UI | TabsContainer', module).add('TabsContainer', () => {
  return (
    <>
      <TabsContainer tabs={tabs}></TabsContainer>
    </>
  )
})
