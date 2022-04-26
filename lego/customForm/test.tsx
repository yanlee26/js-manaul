import { Form } from 'antd'
import React, { useState } from 'react'
import { SearchBtn } from '../customSearch'
import {
  CascadeInput,
  CheckboxInput,
  DataPickerInput,
  DataRangePickerInput,
  NumberRangeInput,
  RadioInput,
  SelectInput,
  TextAreaInput,
  TextInput,
  TreeSelectInput
} from './index'
const TestCustomForm = () => {
  const [form] = Form.useForm()
  const [isShowMoreFormItem, setIsShowMoreFormItem] = useState<boolean>(false)

  function handleSearchReset() {
    form.resetFields()
  }

  async function handleSearch() {
    const formData = await form.validateFields()
    console.log('formData：', formData)
  }

  function handleShowFold() {
    setIsShowMoreFormItem(!isShowMoreFormItem)
  }
  return (
    <Form name="AAA" form={form}>
      <TextInput FormItem={Form.Item} name="TextInput" customLabel="TextInput" required initialValue="111111" />
      <TextInput FormItem={Form.Item} name="TextInput1" customLabel="TextInput1" required initialValue="222222" />
      <TextAreaInput FormItem={Form.Item} name="TextAreaInput" customLabel="TextAreaInput" required initialValue="33" />
      <RadioInput
        name="RadioInput"
        customLabel="RadioInput"
        FormItem={Form.Item}
        required
        optionList={TEST_RADIO_OPTIONS}
        initialValue="2"
      />
      <CheckboxInput
        name="CheckboxInput"
        customLabel="CheckboxInput"
        FormItem={Form.Item}
        required
        optionList={TEST_SELECT_OPTIONS}
        initialValue={['1', '2']}
      />
      <SelectInput
        FormItem={Form.Item}
        name="SelectInput"
        customLabel="SelectInput"
        required
        options={TEST_SELECT_OPTIONS}
        initialValue={'2'}
      />
      <DataPickerInput
        FormItem={Form.Item}
        name="DataPickerInput"
        customLabel="DataPickerInput"
        required
        initialValue="2021-06-18 15:25:10"
      />
      <DataRangePickerInput
        FormItem={Form.Item}
        name="DataRangePickerInput"
        customLabel="DataRangePickerInput"
        required
        initialValue={{ start: '2021-06-17', end: '2021-06-20' }}
      />
      <TreeSelectInput
        FormItem={Form.Item}
        name="TreeSelectInput"
        customLabel="TreeSelectInput"
        required
        optionList={TEST_TREE_SELECT_OPTIONS}
        initialValue={'1-BBMWWYGZTE'}
      />
      <CascadeInput
        FormItem={Form.Item}
        name="CascadeInput"
        customLabel="CascadeInput"
        required
        optionList={TEST_CASCADE_OPTIONS}
        initialValue={['jiangsu', 'suzhou', 'xiangcheng']}
      />

      <NumberRangeInput
        FormItem={Form.Item}
        name="NumberRangeInput"
        required
        customLabel="NumberRangeInput"
        initialValue={[1, 3]}
      />

      <SearchBtn
        isShowUp={isShowMoreFormItem}
        isShowFoldButton={true}
        onSearch={handleSearch}
        onReset={handleSearchReset}
        onShowFold={handleShowFold}
      />
    </Form>
  )
}

const TEST_RADIO_OPTIONS = [
  { code: '1', value: '男' },
  { code: '2', value: '女' }
]

const TEST_SELECT_OPTIONS = [
  { code: '1', value: '男' },
  { code: '2', value: '女' },
  { code: '3', value: '其他' }
]

const TEST_TREE_SELECT_OPTIONS = [
  {
    id: 1,
    value: '1-BBMWWYGZTE',
    label: '1----C端下单',
    children: [
      {
        id: 11,
        value: '11-BBMWWYGZTE',
        label: '11----C端下单',
        children: []
      },
      {
        id: 12,
        value: '12-BBMWWYGZTE',
        label: '12----C端下单',
        children: []
      }
    ]
  },
  {
    id: 2,
    value: '2-BBMWWYGZTE',
    label: '2----C端下单',
    children: []
  }
]
const TEST_CASCADE_OPTIONS = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          {
            value: 'xihu',
            label: '西湖'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        disabled: true,
        children: [
          {
            value: 'zhonghuamen',
            label: '中华门'
          }
        ]
      },
      {
        value: 'suzhou',
        label: '苏州',
        children: [
          {
            value: 'xiangcheng',
            label: '相城'
          }
        ]
      }
    ]
  }
]
export { TestCustomForm }
