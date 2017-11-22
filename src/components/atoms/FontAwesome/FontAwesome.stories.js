import React from 'react'
import { storiesOf } from '@storybook/react'
import FontAwesome from '../FontAwesome'

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

storiesOf('FontAwesome', module)
  .addWithInfo('Default', () => (
    <FontAwesome />
  ))
  .addWithInfo('Loader', () => (
    <div
      style={{
        fontSize: 50
      }}
    >
      <FontAwesome name='spinner' spin pulse fixedWidth />
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
      <FontAwesome name='spinner' />
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
      <FontAwesome />
    </div>
  ))
  .addWithInfo('One symbol', () => (
    <FontAwesome name='A' />
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
        <FontAwesome {...{ name }} />
      </span>
    ))
  ))

