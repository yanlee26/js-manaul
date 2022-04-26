import { storiesOf } from '@storybook/react'
import { Button, Col, Input, Row } from 'antd'
import React from 'react'
import { Column, Container, Flex, Heading, StatusContainer, StyFilterWrap, StyledOperation } from './index'

storiesOf('Only-UI | Styled', module).add('Container', () => {
  return (
    <Container style={{ background: '#cff', color: 'red' }} full fullVertical={false}>
      <Container style={{ background: '#c09' }} full={false}>
        full
      </Container>
      <Container style={{ background: '#cf9' }} fullVertical>
        fullVertical
      </Container>
      <Container style={{ background: '#339' }} full small>
        small
      </Container>
    </Container>
  )
})

storiesOf('Only-UI | Styled', module).add('Flex', () => {
  return (
    <>
      <Flex style={{ background: '#cff' }}>
        <Heading noMargin>default</Heading>
        <Heading noMargin>default</Heading>
      </Flex>
      <hr />
      <Flex style={{ background: '#cff' }} justifyAround>
        <Heading noMargin>justifyAround</Heading>
        <Heading noMargin>justifyAround</Heading>
      </Flex>
      <hr />

      <Flex style={{ background: '#cff' }} justifyBetween>
        <Heading noMargin>justifyBetween</Heading>
        <Heading noMargin>justifyBetween</Heading>
      </Flex>
      <hr />

      <Flex style={{ background: '#cff' }} justifyEvenly>
        <Heading noMargin>justifyEvenly</Heading>
        <Heading noMargin>justifyEvenly</Heading>
      </Flex>
      <hr />

      <Flex style={{ background: '#cff' }} justifyEnd>
        <Heading noMargin>justifyEnd</Heading>
        <Heading noMargin>justifyEnd</Heading>
      </Flex>
      <hr />

      <Flex style={{ background: '#cff' }} alignStretch>
        <Heading noMargin>alignStretch</Heading>
        <Heading noMargin>alignStretch</Heading>
      </Flex>
      <hr />

      <Flex style={{ background: '#cff' }} alignEnd>
        <Heading noMargin>alignEnd</Heading>
        <Heading noMargin>alignEnd</Heading>
      </Flex>
      <hr />

      <Flex style={{ background: '#cff' }} alignCenter>
        <Heading noMargin>alignCenter</Heading>
        <Heading noMargin>alignCenter</Heading>
      </Flex>
      <hr />

      <Flex style={{ background: '#cff' }} alignBaseline>
        <Heading noMargin>alignBaseline</Heading>
        <Heading noMargin>alignBaseline</Heading>
      </Flex>
      <hr />

      <Flex style={{ background: '#cff' }} contentStart>
        <Heading noMargin>contentStart</Heading>
        <Heading noMargin>contentStart</Heading>
      </Flex>
      <hr />

      <Flex style={{ background: '#cff' }} contentEnd>
        <Heading noMargin>contentEnd</Heading>
        <Heading noMargin>contentEnd</Heading>
      </Flex>

      <hr />

      <Flex style={{ background: '#cff' }} column>
        <Heading noMargin>column</Heading>
        <Heading noMargin>column</Heading>
      </Flex>
      <hr />

      <Flex style={{ background: '#cff' }} wrapReverse>
        <Heading noMargin>wrapReverse1</Heading>
        <Heading noMargin>wrapReverse2</Heading>
      </Flex>

      <hr />

      <Flex style={{ background: '#cff' }} noWrap>
        <Heading noMargin>noWrap</Heading>
        <Heading noMargin>noWrap</Heading>
        <Heading noMargin>noWrap</Heading>
        <Heading noMargin>noWrap</Heading>
        <Heading noMargin>noWrap</Heading>
        <Heading noMargin>noWrap</Heading>
        <Heading noMargin>noWrap</Heading>
        <Heading noMargin>noWrap</Heading>
      </Flex>
    </>
  )
})

storiesOf('Only-UI | Styled', module).add('Heading', () => {
  return (
    <Flex style={{ background: '#cff' }} justifyEvenly alignCenter>
      <Heading>h1</Heading>
      <Heading h2>h2</Heading>
      <Heading h3>h3</Heading>
      <Heading h4>h4</Heading>
    </Flex>
  )
})

storiesOf('Only-UI | Styled', module).add('Column', () => {
  return (
    <Flex style={{ background: '#cff' }}>
      <Column three>h2</Column>
      <Column three style={{ background: '#c09' }}>
        h2
      </Column>
    </Flex>
  )
})

storiesOf('Only-UI | Styled', module).add('StatusContainer', () => {
  return (
    <>
      <StatusContainer>default</StatusContainer>
      <StatusContainer success>success</StatusContainer>
      <StatusContainer error>error</StatusContainer>
      <StatusContainer warning>warning</StatusContainer>
    </>
  )
})

storiesOf('Only-UI | Styled', module).add('StyFilterWrap', () => {
  return (
    <StyFilterWrap style={{ background: '#cff', color: 'red' }}>
      <Row gutter={{ xs: 0, sm: 4, md: 8, lg: 24 }}>
        <Col>
          <div className="filter-item">
            <label className="label-wrap" placeholder="学生姓名">
              学生姓名：
            </label>
            <Input allowClear />
          </div>
        </Col>
        <Col>
          <div className="filter-item">
            <label className="label-wrap">课程名称：</label>
            <Input allowClear placeholder="课程名称" />
          </div>
        </Col>
        <Col>
          <div className="filter-item">
            <label className="label-wrap">课程名称：</label>
            <Input allowClear placeholder="课程名称" />
          </div>
        </Col>
      </Row>
    </StyFilterWrap>
  )
})

storiesOf('Only-UI | Styled', module).add('StyledOperation', () => {
  return (
    <>
      <StyledOperation>
        <Button type="link" key="1" hidden={false}>
          班级详情1
        </Button>
        <Button type="link" key="2" hidden>
          班级详情2
        </Button>
        <Button type="link" key="3" hidden={false}>
          班级详情3
        </Button>
        {'null'}
        {true}
      </StyledOperation>
    </>
  )
})
