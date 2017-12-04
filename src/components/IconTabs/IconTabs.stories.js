import React from 'react'
import { storiesOf } from '@storybook/react'
import IconTabs from '../IconTabs'
import items from './IconTabs.mock'

storiesOf('IconTabs', module)
  .addWithInfo('Default', () => (
    <IconTabs />
  ))
  .addWithInfo('Data', () => (
    <div>
      <IconTabs items={items} />
    </div>
  ))

