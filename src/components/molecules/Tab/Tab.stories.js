import React from 'react'
import { storiesOf } from '@storybook/react'
import Tab from '../Tab'
import FontAwesome from '../../atoms/FontAwesome'

const iconFontAwesome = <FontAwesome icon={'truck'} />

storiesOf('Tab', module)
  .addWithInfo('Default', () => (
    <div style={{ width: '260px' }}>
      <Tab />
    </div>
  ))
  .addWithInfo('With text', () => (
    <div style={{ width: '260px' }}>
      <Tab>
        4 team
      </Tab>
    </div>
  ))
  .addWithInfo('With text & default colors icon with symbol', () => (
    <div style={{ width: '260px' }}>
      <Tab icon={'A'}>
        4 team
      </Tab>
    </div>
  ))
  /* .addWithInfo('With text & default colors icon with FontAwesome', () => (
    <div style={{ width: '260px' }}>
      <Tab icon={iconFontAwesome}>
        4 team
      </Tab>
    </div>
  )) */
  .addWithInfo('Disabled', () => (
    <div style={{ width: '260px' }}>
      <Tab icon={'A'} isDisabled>
        4 team
      </Tab>
    </div>
  ))
  .addWithInfo('Active', () => (
    <div style={{ width: '260px', padding: '5px', backgroundColor: '#00eeee' }}>
      <Tab icon={'A'} isActive>
        4 team
      </Tab>
    </div>
  ))
  .addWithInfo('With different icon', () => (
    <div style={{ width: '260px' }}>
      <Tab icon={'A'} iconColor={'#000000'} iconBackgroundColor={'#FFF000'}>
        4 team
      </Tab>
    </div>
  ))
  .addWithInfo('With cross', () => (
    <div style={{ width: '260px' }}>
      <Tab icon={'A'} isWithCross>
        4 team
      </Tab>
    </div>
  ))
  .addWithInfo('With hide cross', () => (
    <div style={{ width: '260px' }}>
      <Tab icon={'A'} isWithCross isHideOnHover>
        4 team
      </Tab>
    </div>
  ))
  .addWithInfo('With long text', () => (
    <div style={{ width: '260px' }}>
      <Tab>
        Это просто какое-то очень длинное название
      </Tab>
    </div>
  ))
  .addWithInfo('Complex example', () => (
    <div style={{ width: '260px' }}>
      <Tab icon={'A'} iconColor={'#000000'} iconBackgroundColor={'#FFF000'} isActive activeColor='#FFF000' isWithCross isHideOnHover>
        Это просто какое-то очень длинное название
      </Tab>
    </div>
  ))