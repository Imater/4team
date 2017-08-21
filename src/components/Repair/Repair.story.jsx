import React from 'react'
import storiesOf from '../../utils/storiesOf.js'
import Repair from '.'

storiesOf('Repair')
  .addWithInfo('Default without props', () => (
    <Repair />
  ))
  .addWithInfo('Default with children', () => (
    <Repair>Repair</Repair>
  ))

