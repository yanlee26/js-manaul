import styled from 'styled-components'

interface FlexProps {
  wrapReverse: boolean
  noWrap: boolean
  justifyContent: string
  justifyCenter: boolean
  justifyAround: boolean
  justifyBetween: boolean
  justifyEvenly: boolean
  justifyEnd: boolean
  alignItems: string
  alignStretch: boolean
  alignEnd: boolean
  alignContent: string
  contentStart: boolean
  contentEnd: boolean
  contentCenter: boolean
  contentBetween: boolean
  contentAround: boolean
  alignCenter: boolean
  alignBaseline: boolean
  column: boolean
  content: string
}
export const Flex = styled.div<Partial<FlexProps>>`
  display: flex;
  flex-wrap: ${props => {
    if (props.wrapReverse) return 'wrap-reverse'
    else if (props.noWrap) return 'nowrap'
    return 'wrap'
  }};
  justify-content: ${props => {
    if (props.justifyContent) return props.justifyContent
    if (props.justifyCenter) return 'center'
    else if (props.justifyAround) return 'space-around'
    else if (props.justifyBetween) return 'space-between'
    else if (props.justifyEvenly) return 'space-evenly'
    else if (props.justifyEnd) return 'flex-end'
    return 'flex-start'
  }};
  align-items: ${props => {
    if (props.alignItems) return props.alignItems
    else if (props.alignStretch) return 'stretch'
    else if (props.alignEnd) return 'flex-end'
    if (props.alignCenter) return 'center'
    else if (props.alignBaseline) return 'baseline'
    return 'flex-start'
  }};
  align-content: ${props => {
    if (props.alignContent) return props.content
    else if (props.contentStart) return 'flex-start'
    else if (props.contentEnd) return 'flex-end'
    else if (props.contentCenter) return 'center'
    else if (props.contentBetween) return 'space-between'
    else if (props.contentAround) return 'contentAround'
    return 'stretch'
  }};
  flex-direction: ${props => (props.column ? 'column' : 'row')};
`
