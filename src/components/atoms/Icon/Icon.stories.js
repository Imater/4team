import React from 'react'
import { storiesOf } from '@storybook/react'
import Icon from '../Icon'

const iconsLibrary = [
  'rocket',
  'heart',
  'circle',
  'adjust',
  'asterisk',
  'beer',
  'bell',
  'ambulance',
  'cog',
  'refresh',
  'truck',
  'spinner'
]

storiesOf('Icon', module)
  .addWithInfo('Default', () => (
    <Icon />
  ))
  .addWithInfo('Loader', () => (
    <div
      style={{
        fontSize: 50
      }}
    >
      <Icon name='spinner' spin pulse fixedWidth />
    </div>
  ))
  .addWithInfo('Black and big star', () => (
    <div
      style={{
        color: 'white',
        background: 'black',
        width: 300,
        height: 300,
        fontSize: 250,
        textAlign: 'center'
      }}
    >
      <Icon name='spinner' />
    </div>
  ))
  .addWithInfo('Without name', () => (
    <div
      style={{
        color: 'white',
        background: 'black',
        width: 300,
        height: 300,
        fontSize: 250,
        textAlign: 'center'
      }}
    >
      <Icon />
    </div>
  ))
  .addWithInfo('One symbol', () => (
    <Icon name='A' />
  ))
  .addWithInfo('Icons library', () => (
    iconsLibrary.map(name => (
      <span
        key={name}
        style={{
          color: 'black',
          padding: 5,
          width: 30,
          height: 30,
          fontSize: 25,
          textAlign: 'center'
        }}
      >
        <Icon {...{ name }} />
      </span>
    ))
  ))

