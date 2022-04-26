import { SwapRightOutlined } from '@ant-design/icons'
import { InputNumber, InputProps } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #556675;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  :hover {
    border-color: #40a9ff;
  }
`

const getValue = (value: number, isRemoveDecimal?: boolean) => {
  if (![undefined, null].includes(value) && isRemoveDecimal) {
    return Math.floor(value)
  }
  return value
}

const initValue = (value?: number, defaultValue?: number) => {
  if (value === 0 || value) {
    return value
  }
  return defaultValue
}

const InputNumberPicker = ({
  defaultValue,
  value,
  placeholder,
  onChange,
  disabled,
  min,
  isRemoveDecimal = true
}: Omit<InputProps, 'onChange'> & {
  isRemoveDecimal?: boolean
  onChange?(values?: [number, number]): void
}) => {
  const [start, setStart] = useState<number>(
    initValue(value && getValue(value[0]), defaultValue && getValue(defaultValue[0]))
  )
  const [end, setEnd] = useState<number>(
    initValue(value && getValue(value[1]), defaultValue && getValue(defaultValue[1]))
  )
  const handleStartChange = (value: number) => {
    const v = getValue(value, isRemoveDecimal)
    setStart(v)
    if (!onChange) {
      return
    }

    if ((v === undefined || v === null) && (end === undefined || end === null)) {
      onChange()
      return
    }

    onChange([v, end])
  }

  const handleEndChange = (value: number) => {
    const v = getValue(value, isRemoveDecimal)
    setEnd(v)
    if (!onChange) {
      return
    }

    if ((v === undefined || v === null) && (start === undefined || start === null)) {
      onChange()
      return
    }

    onChange([start, v])
  }

  return (
    <Container>
      <InputNumber
        id="start"
        value={start}
        placeholder={placeholder || `开始值`}
        onChange={handleStartChange}
        disabled={disabled}
        bordered={false}
        min={min}
      />
      <SwapRightOutlined style={{ color: 'rgba(0,0,0,0.25)', fontSize: 16 }} />
      <InputNumber
        id="end"
        value={end}
        bordered={false}
        placeholder={placeholder || `结束值`}
        onChange={handleEndChange}
        disabled={start === undefined || start === null}
        min={min}
      />
    </Container>
  )
}

export { InputNumberPicker }
