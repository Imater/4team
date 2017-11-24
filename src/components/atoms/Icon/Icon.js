import React, { PureComponent } from 'react'
import FontAwesomeSymbol from 'react-fontawesome'
import { string } from 'prop-types'

import styles from './Icon.sss'

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
      ? <FontAwesomeSymbol name={name} className={styles.con} {...this.props} />
      : <div className={styles.icon}>{name}</div>

    return (
      content
    )
  }
}
