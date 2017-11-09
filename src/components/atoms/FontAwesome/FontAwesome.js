import React, { PureComponent } from 'react'
import { default as FontAwesomeSymbol } from 'react-fontawesome'
import { string } from 'prop-types'

import styles from './FontAwesome.sss'

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
      <FontAwesomeSymbol name={name} {...this.props}/>
    )
  }
}
