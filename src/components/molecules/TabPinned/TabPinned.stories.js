import React from 'react'
import { storiesOf } from '@storybook/react'
import TabPinned from '../TabPinned'

storiesOf('TabPinned', module)
  .addWithInfo('Default', () => (
    <TabPinned />
  ))
  .addWithInfo('With icon', () => (
    <TabPinned icon='heart' />
  ))
  .addWithInfo('With symbol', () => (
    <TabPinned>
      A
    </TabPinned>
  ))
  .addWithInfo('Disabled', () => (
    <TabPinned icon='heart' isDisabled />
  ))
  .addWithInfo('Complex example', () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ borderRight: '1px solid #000' }}>
        <TabPinned color='#FFFFFF' backgroundColor='#FFEF09' icon='cloud' />
      </div>
      <div style={{ borderRight: '1px solid #000' }}>
        <TabPinned icon='heart' isDisabled />
      </div>
      <div style={{ borderRight: '1px solid #000' }}>
        <TabPinned color='#FFFFFF' backgroundColor='#FF00FE' icon='gift' isDisabled />
      </div>
      <div style={{ borderRight: '1px solid #000' }}>
        <TabPinned color='#FFFFFF' backgroundColor='#FF00FE'>
          A
        </TabPinned>
      </div>
      <TabPinned color='#FFFFFF' backgroundColor='#4443DC' icon='car' isDisabled />
    </div>
  ))
