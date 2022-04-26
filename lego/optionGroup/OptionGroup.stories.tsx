import { storiesOf } from '@storybook/react'
import React from 'react'
import { FormItemStyle } from '../formItemList'
import { GenCheckboxGroup, GenRadioGroup, GenSelectGroup, GenSelectGroupOfArray, GenSelectGroupOfDict } from './index'

enum PositionStatus {
  FULL_TIME,
  PART_TIME
}
const TeacherStatusMap = new Map<number, string>([
  [PositionStatus.FULL_TIME, '全职'],
  [PositionStatus.PART_TIME, '兼职']
])
const options = [
  {
    sysDicId: 13,
    code: 'lt0001',
    value: '讲授课'
  },
  {
    sysDicId: 14,
    code: 'lt0002',
    value: '答疑课'
  }
]
storiesOf('Only-UI | OptionGroup', module).add('GenRadioGroup', () => {
  return <GenRadioGroup options={TeacherStatusMap} />
})

storiesOf('Only-UI | OptionGroup', module).add('GenCheckboxGroup', () => {
  return <GenCheckboxGroup options={options} />
})

storiesOf('Only-UI | OptionGroup', module).add('GenSelectGroup', () => {
  return <GenSelectGroup hasAll options={TeacherStatusMap} defaultValue={PositionStatus.FULL_TIME} />
})

storiesOf('Only-UI | OptionGroup', module).add('GenSelectGroupOfArray', () => {
  return <GenSelectGroupOfArray options={options} valueProp={'value'} />
})

storiesOf('Only-UI | OptionGroup', module).add('GenSelectGroupOfDict', () => {
  const previewFormItemStyle = {
    labelCol: { span: 2 },
    wrapperCol: { span: 4 },
    labelAlign: 'left'
  } as any

  return (
    <FormItemStyle label="课程类型" required {...previewFormItemStyle}>
      <GenSelectGroupOfDict hasAll options={options} />
    </FormItemStyle>
  )
})
