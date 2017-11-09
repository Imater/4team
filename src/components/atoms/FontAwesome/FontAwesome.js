import React, { PureComponent } from 'react'
import FontAwesomeSymbol from 'react-fontawesome'
import { string } from 'prop-types'

export default class FontAwesome extends PureComponent {
  static propTypes = {
    name: string
  }

  render() {
    const { name } = this.props

    if (!name) {
      return null
    }

    return (
      <FontAwesomeSymbol
        name={name}
        {...this.props}
      />
    )
  }
}
