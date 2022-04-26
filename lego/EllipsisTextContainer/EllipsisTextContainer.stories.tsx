import { storiesOf } from '@storybook/react'
import React from 'react'
import { EllipsisTextContainer } from './index'

const txt =
  'React 和 Web Components 为了解决不同的问题而生。Web Components 为可复用组件提供了强大的封装，而 React 则提供了声明式的解决方案，使 DOM 与数据保持同步。两者旨在互补。作为开发人员，可以自由选择在 Web Components 中使用 React，或者在 React 中使用 Web Components，或者两者共存。'
storiesOf('Only-UI | EllipsisTextContainer', module).add('default', () => {
  return (
    <>
      <EllipsisTextContainer width={500} maxStrLen={70}>{`default: ${txt}`}</EllipsisTextContainer>
      <hr />
      <EllipsisTextContainer link>{`link: ${txt}`}</EllipsisTextContainer>
    </>
  )
})
