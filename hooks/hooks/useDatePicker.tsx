import { DatePicker } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { FORMATWEEK_WITH_HM } from 'utils'

interface UseDatePickerProps {
  initialValue?: { [x: string]: string | undefined }
  hasLabel?: boolean
}

export const useDatePicker = ({ initialValue }: UseDatePickerProps) => {
  const [date, setDate] = useState(initialValue)

  const DatePickerItem = ({ prop, disabled = false }: { prop: string; disabled?: boolean }) => (
    <DatePicker
      style={{ width: '100%' }}
      showTime
      format={FORMATWEEK_WITH_HM}
      defaultValue={initialValue && initialValue[prop] ? moment(initialValue[prop]) : undefined}
      value={date && date[prop] ? moment(date[prop]) : undefined}
      onChange={(v, str) => {
        setDate({ ...date, [prop]: str })
      }}
      disabled={disabled}
    />
  )

  return {
    date,
    DatePickerItem
  }
}
