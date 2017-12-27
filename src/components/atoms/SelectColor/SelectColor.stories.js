import React from 'react'
import { storiesOf } from '@storybook/react'
import SelectColor from '../SelectColor'

const colorsArray = [
  ['#000000', '#EE1100'],
  ['#000000', '#FF00FE'],
  ['#000000', '#FF6644'],
  ['#000000', '#FDAE2D'],
  ['#000000', '#FDF204'],
  ['#000000', '#AACB22'],
  ['#000000', '#69D126'],
  ['#000000', '#21CCA8'],
  ['#000000', '#11AABA'],
  ['#000000', '#4443DC'],
  ['#000000', '#44229A'],
  ['#FFFFFF', '#000000']
]

storiesOf('SelectColor', module)
  .addWithInfo('Default', () => (
    <SelectColor colorsArray={colorsArray} />
  ))
  .addWithInfo('Color choosed', () => (
    <SelectColor colorsArray={colorsArray} currentColorIndex={11} />
  ))
