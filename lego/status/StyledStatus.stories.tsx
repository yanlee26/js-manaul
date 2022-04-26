import { storiesOf } from '@storybook/react'
import React from 'react'
import { StyledStatus } from './index'

enum TrueOrFalse {
  False,
  True
}
const StaffStatusMap = new Map<number, string>([
  [TrueOrFalse.True, '启用'],
  [TrueOrFalse.False, '禁用']
])

storiesOf('Only-UI | StyledStatus', module).add('StyledStatus', () => {
  return (
    <>
      <StyledStatus status={0} map={StaffStatusMap} />
      <StyledStatus status={1} />
    </>
  )
})
