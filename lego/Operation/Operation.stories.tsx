import { storiesOf } from '@storybook/react'
import React from 'react'
import { OnlyTable } from '../onlyTable'
import { OperationContainer } from './index'

storiesOf('Only-UI | Operation', module).add('Operation', () => {
  const dataSource = [
    {
      key: '1',
      name: 'only',
      age: 32,
      mobile: '13547833990',
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '昂立',
      age: 100,
      mobile: '19044438762',
      address: '北京天安门'
    }
  ]
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },

    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, row) => (
        <OperationContainer
          buttonItems={[
            {
              id: 0,
              text: '详情'
            },
            {
              id: 1,
              text: '编辑'
            }
          ]}
          moreItems={[
            {
              id: 0,
              text: '取消'
            }
          ]}
        />
      )
    }
  ]
  return (
    <>
      <OnlyTable columns={columns} dataSource={dataSource} />
    </>
  )
})
