import styled from 'styled-components'

export enum TrueOrFalse {
  False,
  True
}
export const StaffStatusMap = new Map<number, string>([
  [TrueOrFalse.True, '启用'],
  [TrueOrFalse.False, '禁用']
])

interface StyledStatusProps {
  status: number | boolean
  showPoint?: boolean
  map?: Map<number | boolean, string>
}

export const StyledStatus = styled.span.attrs(({ map, status }: StyledStatusProps) => {
  const statusMap = map || StaffStatusMap
  return {
    children: statusMap.get(status)
  }
})<StyledStatusProps>`
  &:before {
    display: inline-block;
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 4px;
    background: ${({ showPoint = true, status }) => (showPoint ? (status ? '#00A854' : '#F04134') : '')};
  }
`
