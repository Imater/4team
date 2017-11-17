import React from 'react'
import { storiesOf } from '@storybook/react'
import TabPinned from '../TabPinned'

storiesOf('TabPinned', module)
  .addWithInfo('Default', () => (
    <TabPinned />
  ))
  .addWithInfo('Disabled', () => (
    <TabPinned isDisabled />
  ))
