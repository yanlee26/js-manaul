import styled from 'styled-components'

interface ColumnProps {
  three: boolean
  four: boolean
  noPadding: boolean
}
export const Column = styled.div<Partial<ColumnProps>>`
  width: ${props => {
    if (props.three) return '33.33%'
    if (props.four) return '25%'
    return '50%'
  }};
  padding: ${props => (props.noPadding ? 0 : '15px')};
`
