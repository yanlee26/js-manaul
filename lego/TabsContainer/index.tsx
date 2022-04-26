import React, { ReactChild, useState } from 'react'
import { Tabs } from 'antd'

const { TabPane } = Tabs

export type TabItemType = {
  label: string
  value: ReactChild
}

export interface TabsContainerProps {
  tabs: Map<string, TabItemType>
  defaultKey?: string
}

export const TabsContainer = ({ tabs, defaultKey = '0' }: TabsContainerProps) => {
  const [activeKey, setActiveKey] = useState<string>(defaultKey)

  const onChangeTab = (key: any) => {
    setActiveKey(key)
  }

  return (
    <div>
      <Tabs type="card" activeKey={activeKey} onChange={onChangeTab}>
        {[...tabs.values()].map(({ label }, i) => (
          <TabPane tab={label} key={`${i}`} />
        ))}
      </Tabs>
      {tabs.get(activeKey)?.value}
    </div>
  )
}
