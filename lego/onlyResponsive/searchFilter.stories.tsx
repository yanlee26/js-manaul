import { storiesOf } from '@storybook/react'
import { Button, DatePicker, Input, Select } from 'antd'
import React from 'react'
import { SearchFilter } from './index'
const { SearchItem } = SearchFilter
const { Option } = Select
const { RangePicker } = DatePicker

storiesOf('Only-UI | SearchFilter', module).add('default', () => {
  return (
    <SearchFilter
      buttons={
        <SearchItem>
          <Button>重置</Button>
          <Button type="primary">搜索</Button>
        </SearchItem>
      }
    >
      <SearchItem label="学生姓名">
        <Input allowClear placeholder="请输入" />
      </SearchItem>
      <SearchItem label="课节名称">
        <Select allowClear placeholder="请选择">
          <Option key={1} value={1}>
            test
          </Option>
        </Select>
      </SearchItem>

      <SearchItem label="听课时间">
        <RangePicker />
      </SearchItem>
    </SearchFilter>
  )
})

storiesOf('Only-UI | SearchFilter', module).add('inline', () => {
  return (
    <SearchFilter>
      <SearchItem label="学生姓名">
        <Input allowClear placeholder="请输入" />
      </SearchItem>
      <SearchItem label="课节名称">
        <Select allowClear placeholder="请选择">
          <Option key={1} value={1}>
            test
          </Option>
        </Select>
      </SearchItem>

      <SearchItem label="听课时间">
        <RangePicker />
        <Button type="primary">搜索</Button>
      </SearchItem>
    </SearchFilter>
  )
})
