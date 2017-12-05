import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import IconTabs from '../IconTabs'
import items from './IconTabs.mock'

class IconTabsParent extends Component {
  state = {
    value: 'decor'
  }

  handleChange = name => {
    this.setState({
      value: name
    })
  }

  render() {
    return (
      <div>
        <IconTabs
          items={items}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

storiesOf('IconTabs', module)
  .addWithInfo('Default', () => (
    <IconTabs />
  ))
  .addWithInfo('IconTabsParent', () => (
    <IconTabsParent />
  ))

