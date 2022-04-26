import React from 'react'
import styled from 'styled-components'
import { links, ONLY_TOKEN } from './config'

interface ProjectGatewayProps {
  token: string
}

export const StyledLi = styled.li`
  &:hover {
    color: #1890ff;
    background: rgba(24, 144, 255, 0.15);
  }
`
export const ProjectGateway = ({ token }: ProjectGatewayProps) => (
  <>
    {links.map(({ key, value, title }) => (
      <StyledLi key={key} role="menuitem" className="ant-dropdown-menu-item ant-dropdown-menu-item-only-child">
        <a target="_blank" rel="noopener noreferrer" href={`${value}?${ONLY_TOKEN}=${token}`}>
          {title}
        </a>
      </StyledLi>
    ))}
  </>
)
