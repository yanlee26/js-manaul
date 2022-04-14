import { FormInstance } from 'antd/lib/form'
import { InitialItem } from 'interface'
import React, { useState, useRef } from 'react'

export function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue)
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  return {
    value,
    onChange: handleChange
  }
}

const initialTeacherItemValue = {
  teacher: undefined,
  classTeacher: undefined,
  assistant: undefined
}

const teacherIdNameMap = new Map<string, keyof InitialItem | undefined>([
  ['lecturerUserId', 'teacher'],
  ['assistantUserId', 'assistant'],
  ['classTeacherId', 'classTeacher']
])

type NameType = string | undefined

export function useMemoSearchTeacherForm(
  form: FormInstance,
  initialValue: { [x: string]: NameType } = initialTeacherItemValue
) {
  const initialTeacherRef = useRef<InitialItem>(initialTeacherItemValue)
  function changeRef(key: keyof InitialItem, value: NameType) {
    initialTeacherRef.current[key] = value
  }

  function resetRef() {
    initialTeacherRef.current = initialTeacherItemValue
  }

  const onSetFileldsValue = (value: any, prop = 'lecturerUserId', valueName: string) => {
    form.setFieldsValue({
      [prop]: value
    })
    const key = teacherIdNameMap.get(prop)
    key && changeRef(key, valueName)
  }

  const { teacher, classTeacher, assistant } = initialTeacherRef.current

  return {
    teacher,
    classTeacher,
    assistant,
    teacherIdNameMap,
    resetRef,
    changeRef,
    onSetFileldsValue
  }
}
