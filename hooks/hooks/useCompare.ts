import { useRef } from 'react'
import _ from 'lodash'

export const useDeepCompareWithRef = (value: any) => {
  const ref = useRef()
  // Performs a deep comparison between two values to determine if they are equivalent.
  if (!_.isEqual(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}
