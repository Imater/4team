import React from 'react'
import { storiesOf } from '@storybook/react'
import Box from '../Box'
import FontAwesome from '../FontAwesome'

storiesOf('Box', module)
  .addWithInfo('Default', () => (
    <Box>
      A
    </Box>
  ))
  .addWithInfo('With FontAwesome', () => (
    <Box>
      <FontAwesome name='heart' />
    </Box>
  ))
  .addWithInfo('Element size 20px', () => (
    <Box size={20}>
      A
    </Box>
  ))
  .addWithInfo('Element size 20px with FontAwesome', () => (
    <Box size={20}>
      <FontAwesome name='heart' />
    </Box>
  ))
  .addWithInfo('Element size 45px', () => (
    <Box size={45}>
      A
    </Box>
  ))
  .addWithInfo('Element size 45px with FontAwesome', () => (
    <Box size={45}>
      <FontAwesome name='heart' />
    </Box>
  ))
  .addWithInfo('Element size 70px', () => (
    <Box size={70}>
      A
    </Box>
  ))
  .addWithInfo('Element size 70px with FontAwesome', () => (
    <Box size={70}>
      <FontAwesome name='heart' />
    </Box>
  ))
  .addWithInfo('Element size 100px', () => (
    <Box size={100}>
      A
    </Box>
  ))
  .addWithInfo('Element size 100px with FontAwesome', () => (
    <Box size={100}>
      <FontAwesome name='heart' />
    </Box>
  ))
  .addWithInfo('Red element', () => (
    <Box color='#FFFFFF' backgroundColor='#FC6B3E' >
      A
    </Box>
  ))
  .addWithInfo('First element', () => (
    <Box isFirst>
      A
    </Box>
  ))
  .addWithInfo('Last element', () => (
    <Box isLast>
      A
    </Box>
  ))
  .addWithInfo('Alone element', () => (
    <Box isFirst isLast>
      A
    </Box>
  ))
  .addWithInfo('With title', () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Box isFirst isLast>
        A
      </Box>
      <span style={{ marginLeft: '10px', width: '100px', fontSize: '16px', lineHeight: '16px', fontWeight: 'bold' }}>Заголовок 1</span>
    </div>
  ))
  .addWithInfo('With multiline title', () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Box isFirst isLast>
        A
      </Box>
      <span style={{ marginLeft: '10px', width: '150px', fontSize: '16px', lineHeight: '20px', fontWeight: 'bold' }}>Заголовок строкa 1 Заголовок строкa 2 Заголовок строкa 3</span>
    </div>
  ))
  .addWithInfo('Complex example', () => (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box color='#FFFFFF' backgroundColor='#FC6B3E' isFirst>
          <FontAwesome name='heart' />
        </Box>
        <span style={{ marginLeft: '10px', width: '150px', fontSize: '16px', lineHeight: '20px', fontWeight: 'bold' }}>Первый заголовок из двух строк</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box color='#000000' backgroundColor='#FFF000'>
          <FontAwesome name='truck' />
        </Box>
        <span style={{ marginLeft: '10px', width: '150px', fontSize: '16px', lineHeight: '20px', fontWeight: 'bold' }}>Второй заголовок состоит из трех строк</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box isLast>
          A
        </Box>
        <span style={{ marginLeft: '10px', width: '150px', fontSize: '16px', lineHeight: '20px', fontWeight: 'bold' }}>Третий заголовок</span>
      </div>
    </div>
  ))

