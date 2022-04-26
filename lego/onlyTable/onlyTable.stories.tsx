import { storiesOf } from '@storybook/react'
import { Button, Divider, Radio } from 'antd'
import React, { useState } from 'react'
import { OnlyTable } from './index'

storiesOf('Only-UI | OnlyTable', module).add('default', () => {
  const props = {
    dataSource: [
      {
        key: '1',
        name: '',
        age: 32,
        address: '公-号西湖区湖底公--园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 0,
        address: '西湖区湖底公园1号'
      },
      {
        key: '3',
        name: '胡彦祖',
        age: 0,
        address: null
      }
    ],
    columns: [
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
        title: '住址',
        dataIndex: 'address',
        key: 'address'
      }
    ]
  }

  return <OnlyTable {...props} />
})

storiesOf('Only-UI | OnlyTable', module).add('textOver', () => {
  const props = {
    dataSource: [
      {
        key: '1',
        name: '',
        age: 32,
        address:
          '西湖区湖底公--园1号西湖区湖底公--园1号西湖区湖底公--园1号西湖区湖底公--园1号西湖区湖底公--园1号西湖区湖底公--园1号西湖区湖底公--园1号西湖区湖底公--园1号西湖区湖底公--园1号西湖区湖底公--园1号西湖区湖底公--园1号西湖区湖底公--园1号西湖区湖底公--园1号西湖区湖底公--园1号',
        address1: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name:
          '胡彦祖胡彦祖胡祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖胡彦祖',
        age: 0,
        address: '西湖区湖底公园1号',
        address1: '西湖区湖底公园1号'
      },
      {
        key: '3',
        name: '胡彦祖',
        age: 0,
        address: null,
        address1:
          '西湖区湖底湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公公园1号'
      },
      {
        key: '4',
        name: '',
        age: null,
        address: 'test',
        address1:
          '西湖区湖底湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公公园1号'
      },
      {
        key: '5',
        name: '',
        age: null,
        address: 'test',
        address1:
          '西湖区湖底湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公公园1号'
      },
      {
        key: '6',
        name: '',
        age: null,
        address: 'test',
        address1:
          '西湖区湖底湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公公园1号'
      },
      {
        key: '7',
        name: '',
        age: null,
        address: 'test',
        address1:
          '西湖区湖底湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公公园1号'
      },
      {
        key: '8',
        name: '',
        age: null,
        address: 'test',
        address1:
          '西湖区湖底湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公公园1号'
      },
      {
        key: '9',
        name: '',
        age: null,
        address: 'test',
        address1:
          '西湖区湖底湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公公园1号'
      },
      {
        key: '10',
        name: '',
        age: null,
        address: 'test',
        address1:
          '西湖区湖底湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公公园1号'
      },
      {
        key: '11',
        name: '',
        age: null,
        address: 'test',
        address1:
          '西湖区湖底湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公公园1号'
      },
      {
        key: '12',
        name: '',
        age: null,
        address: 'test',
        address1:
          '西湖区湖底湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公公园1号'
      },
      {
        key: '13',
        name: '',
        age: null,
        address: 'test',
        address1:
          '西湖区湖底湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公公园1号'
      },
      {
        key: '14',
        name: '',
        age: null,
        address: 'test',
        address1:
          '西湖区湖底湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公湖区湖底公公园1号'
      }
    ],
    columns: [
      {
        title: '住址',
        dataIndex: 'address1',
        key: 'address1',
        fixed: 'left' as any
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: (name, record) => (
          <Button
            type="link"
            onClick={() => {
              alert(record.name)
            }}
          >
            {name}
          </Button>
        )
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 300
      },

      {
        title: '住址',
        dataIndex: 'address1',
        key: 'address1'
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
      }
    ],
    scroll: {
      x: 'max-content'
    },
    pagination: {
      showSizeChanger: true
    }
  }

  return <OnlyTable {...props} />
})

storiesOf('Only-UI | OnlyTable', module).add('check', () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: 'Age',
      dataIndex: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address'
    }
  ]

  interface DataType {
    key: React.Key
    name: string
    age: number
    address: string
  }

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park'
    }
  ]

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }

  const Demo = () => {
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox')

    return (
      <div>
        <Radio.Group
          onChange={({ target: { value } }) => {
            setSelectionType(value)
          }}
          value={selectionType}
        >
          <Radio value="checkbox">Checkbox</Radio>
          <Radio value="radio">radio</Radio>
        </Radio.Group>

        <Divider />

        <OnlyTable
          rowSelection={{
            type: selectionType,
            ...rowSelection
          }}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 1, size: 'small' }}
        />
      </div>
    )
  }

  return <Demo />
})

storiesOf('Only-UI | OnlyTable', module).add('sticky', () => {
  const props = {
    dataSource: [
      {
        key: '1',
        name: '',
        age: 32,
        address: '公-号西湖区湖底公--园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 0,
        address: '西湖区湖底公园1号'
      },
      {
        key: '3',
        name: '',
        age: 32,
        address: '公-号西湖区湖底公--园1号'
      },
      {
        key: '4',
        name: '胡彦祖',
        age: 0,
        address: '西湖区湖底公园1号'
      },
      {
        key: '5',
        name: '',
        age: 32,
        address: '公-号西湖区湖底公--园1号'
      },
      {
        key: '6',
        name: '胡彦祖',
        age: 0,
        address: '西湖区湖底公园1号'
      },
      {
        key: '7',
        name: '',
        age: 32,
        address: '公-号西湖区湖底公--园1号'
      },
      {
        key: '8',
        name: '胡彦祖',
        age: 0,
        address: '西湖区湖底公园1号'
      },
      {
        key: '9',
        name: '',
        age: 32,
        address: '公-号西湖区湖底公--园1号'
      },
      {
        key: '10',
        name: '胡彦祖',
        age: 0,
        address: '西湖区湖底公园1号'
      },
      {
        key: '11',
        name: '',
        age: 32,
        address: '公-号西湖区湖底公--园1号'
      },
      {
        key: '12',
        name: '胡彦祖',
        age: 0,
        address: '西湖区湖底公园1号'
      },
      {
        key: '12',
        name: '',
        age: 32,
        address: '公-号西湖区湖底公--园1号'
      },
      {
        key: '14',
        name: '胡彦祖',
        age: 0,
        address: '西湖区湖底公园1号'
      },
      {
        key: '15',
        name: '胡彦祖',
        age: 0,
        address: null
      }
    ],
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '这是一个年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '住址2',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '住址3',
        dataIndex: 'address',
        key: 'address'
      }
    ]
  }

  return (
    <>
      <h1 style={{ height: 200 }}>test</h1>
      <OnlyTable sticky isNeedResetWidth {...props} />
    </>
  )
})
