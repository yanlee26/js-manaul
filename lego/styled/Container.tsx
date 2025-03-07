import styled from 'styled-components'

interface ContainerProps {
  full: boolean
  fullVertical: boolean
  small: boolean
}

export const Container = styled.div<Partial<ContainerProps>>`
  padding-left: ${props => {
    if (props.full) return 0
    return 'calc((100vw - 960px) / 2)'
  }};
  padding-right: ${props => {
    if (props.full) return 0
    return 'calc((100vw - 960px) / 2)'
  }};
  padding-top: ${props => {
    if (props.fullVertical) return 0
    if (props.small) return '15px'
    return '25px'
  }};
  padding-bottom: ${props => {
    if (props.fullVertical) return 0
    if (props.small) return '15px'
    return '25px'
  }};
`
