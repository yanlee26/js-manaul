import { useTCplayer } from '@keukenhof/hooks'
import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import { OnlyTabs } from './index'

storiesOf('Only-UI | OnlyTabs', module).add('default', () => {
  const { TabPane } = OnlyTabs
  const videoList = ['5285890815367516437', '5285890815367249197', '5285890816913116477']
  const id = 'player-container-id'
  const [filedId, setFiledId] = useState(videoList[0])
  useTCplayer({
    config: { containerId: id, options: { width: 1000, height: 550 } },
    apiReport: test => {
      console.log('🚀 ~ file: onlyTabs.stories.tsx ~ line 1 ~ storiesOf ~ test', test)
      return Promise.resolve(test)
    },
    filedId
  })

  return (
    <OnlyTabs defaultActiveKey="1">
      <TabPane tab="Tab 1" key="1">
        <video id={id} playsInline />
        {videoList.map(item => (
          <button key={item} onClick={() => setFiledId(item)}>
            切换视频{item}
          </button>
        ))}
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </OnlyTabs>
  )
})

storiesOf('Only-UI | OnlyTabs', module).add('card', () => {
  const { TabPane } = OnlyTabs
  const videoList = ['5285890815367516437', '5285890815367249197', '5285890816913116477']
  const id = 'player-container-id'
  const [filedId, setFiledId] = useState(videoList[0])
  useTCplayer({
    config: { containerId: id, options: { width: 800, height: 500 } },
    apiReport: test => {
      console.log('🚀 ~ file: onlyTabs.stories.tsx ~ line 1 ~ storiesOf ~ test', test)
      return Promise.resolve(test)
    },
    filedId
  })

  return (
    <OnlyTabs defaultActiveKey="1" type="card">
      <TabPane tab="Tab 1" key="1">
        <video id={id} playsInline />
        {videoList.map(item => (
          <button key={item} onClick={() => setFiledId(item)}>
            切换视频{item}
          </button>
        ))}
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </OnlyTabs>
  )
})
