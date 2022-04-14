export const autoIncreateId = (nameSpace: string) => {
  const record: Record<string, number> = {}
  record[nameSpace] = record[nameSpace] || 0
  return () => record[nameSpace]++
}
