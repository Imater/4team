import React from 'react'
import { storiesOf } from '@storybook/react'
import Repair from '.'

storiesOf('Repair', module)
  .addWithInfo('Default without props', () => (
    <Repair />
  ))
  .addWithInfo('Default with children', () => (
    <Repair>Repair</Repair>
  ))

