import { Tabs } from 'antd'
import { TabsProps } from 'antd/lib/tabs'
import React from 'react'
import styled from 'styled-components'

const StyOnly = styled(Tabs)`
  color: #556675;
  &:not(.ant-tabs-card) {
    .ant-tabs-tab {
      margin: 0;
      + .ant-tabs-tab {
        margin: 0 0 0 48px;
      }
    }
  }
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      font-weight: normal;
    }
  }
`
export const OnlyTabs = (props: TabsProps) => {
  return <StyOnly {...props} />
}

OnlyTabs.TabPane = Tabs.TabPane
