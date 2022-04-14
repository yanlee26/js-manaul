import { useState } from 'react'
import { onConfirm, patchAPICatch } from 'utils'

interface UseOperationsProps {
  [x: string]: boolean
}

interface OptionsType {
  params: any
  type: string
  api: (...params: any) => Promise<any>
  successTxt?: string
  update?: () => void
}
const initModalsVisible = {
  addEdit: false,
  preview: false
}

export const useOperations = (initialValue: UseOperationsProps = initModalsVisible, topUpdate = console.log) => {
  const [modalsVisible, setModalsVisible] = useState(initialValue)
  function toggleVisible(key: keyof typeof initialValue = 'addEdit') {
    setModalsVisible(old => ({
      ...old,
      [key]: !old[key]
    }))
  }

  async function confirmOpt({ type, api, params, update = topUpdate }: OptionsType) {
    function onOk() {
      patchAPICatch({
        type,
        api,
        params,
        onSuccess: update
      })
    }

    onConfirm({
      title: `确定要${type}?`,
      onOk
    })
  }

  return {
    modalsVisible,
    confirmOpt,
    toggleVisible
  }
}
