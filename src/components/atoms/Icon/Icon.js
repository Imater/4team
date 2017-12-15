import React, { PureComponent } from 'react'
import FontAwesomeSymbol from 'react-fontawesome'
import { string } from 'prop-types'

import styles from './Icon.styl'

export default class Icon extends PureComponent {
  static propTypes = {
    name: string
  }

  render() {
    const { name } = this.props

    if (!name) {
      return null
    }

    const content = name.length > 1
      ? <FontAwesomeSymbol name={name} className={styles.icon} {...this.props} />
      : <div className={styles.icon}>{name}</div>

    return (
      content
    )
  }
}
