import { EnumPermissions } from 'config'
import { useMemo } from 'react'
import { onlyUserLocalStore } from 'utils'

export function usePermissions(keys: Array<EnumPermissions>): Array<boolean> {
  const [getUserLocalStore] = onlyUserLocalStore()
  const featurePermissionMap = getUserLocalStore?.featurePermissionMap || {}

  const memoizedPermissions = useMemo(() => keys.map(key => !!featurePermissionMap[key]), [keys])
  return memoizedPermissions
}
