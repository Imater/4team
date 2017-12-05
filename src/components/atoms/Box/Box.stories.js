import React from 'react'
import { storiesOf } from '@storybook/react'
import Box from '../Box'

storiesOf('Box', module)
  .addWithInfo('Default', () => (
    <Box />
  ))
  .addWithInfo('With one symbol', () => (
    <Box name='A' />
  ))
  .addWithInfo('With one symbol as children', () => (
    <Box>B</Box>
  ))
  .addWithInfo('With long children', () => (
    <Box>Box</Box>
  ))
  .addWithInfo('With very long children', () => (
    <Box>Box is now very big</Box>
  ))
  .addWithInfo('With Icon', () => (
    <Box name='heart' />
  ))
  .addWithInfo('Element size 20px', () => (
    <Box size={20} name='A' />
  ))
  .addWithInfo('Element size 20px with Icon', () => (
    <Box size={20} name='heart' />
  ))
  .addWithInfo('Element size 45px', () => (
    <Box size={45} name='A' />
  ))
  .addWithInfo('Element size 45px with Icon', () => (
    <Box size={45} name='heart' />
  ))
  .addWithInfo('Element size 70px', () => (
    <Box size={70} name='A' />
  ))
  .addWithInfo('Element size 70px with Icon', () => (
    <Box size={70} name='heart' />
  ))
  .addWithInfo('Element size 100px', () => (
    <Box size={100} name='A' />
  ))
  .addWithInfo('Element size 100px with Icon', () => (
    <Box size={100} name='heart' />
  ))
  .addWithInfo('Red element', () => (
    <Box color='#FFFFFF' backgroundColor='#FC6B3E' name='A' />
  ))
  .addWithInfo('First element', () => (
    <Box name='A' isFirst />
  ))
  .addWithInfo('Last element', () => (
    <Box name='A' isLast />
  ))
  .addWithInfo('Alone element', () => (
    <Box name='A' isFirst isLast />
  ))
  .addWithInfo('With title', () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Box name='A' isFirst isLast />
      <span style={{ marginLeft: '10px', width: '100px', fontSize: '16px', lineHeight: '16px', fontWeight: 'bold' }}>Заголовок 1</span>
    </div>
  ))
  .addWithInfo('With multiline title', () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Box name='A' isFirst isLast />
      <span style={{ marginLeft: '10px', width: '150px', fontSize: '16px', lineHeight: '20px', fontWeight: 'bold' }}>Заголовок строкa 1 Заголовок строкa 2 Заголовок строкa 3</span>
    </div>
  ))
  .addWithInfo('Complex example', () => (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box name='heart' color='#FFFFFF' backgroundColor='#FC6B3E' isFirst />
        <span style={{ marginLeft: '10px', width: '150px', fontSize: '16px', lineHeight: '20px', fontWeight: 'bold' }}>Первый заголовок из двух строк</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box name='truck' color='#000000' backgroundColor='#FFF000' />
        <span style={{ marginLeft: '10px', width: '150px', fontSize: '16px', lineHeight: '20px', fontWeight: 'bold' }}>Второй заголовок состоит из трех строк</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box name='A' isLast />
        <span style={{ marginLeft: '10px', width: '150px', fontSize: '16px', lineHeight: '20px', fontWeight: 'bold' }}>Третий заголовок</span>
      </div>
    </div>
  ))

