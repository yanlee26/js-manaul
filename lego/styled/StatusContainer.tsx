import styled from 'styled-components'

interface StatusContainerProps {
  success: boolean
  error: boolean
  warning: boolean
  display?: 'inline' | 'block' | 'inline-block'
}

export const StatusContainer = styled.div<Partial<StatusContainerProps>>`
  color: ${props => {
    if (props.success) return '#1890ff'
    if (props.error) return '#FF4D4F'
    if (props.warning) return '#FA8800'
    return ' rgba(0, 0, 0, 0.65)'
  }};

  display: ${({ display = 'block' }) => {
    return display
  }};
`
