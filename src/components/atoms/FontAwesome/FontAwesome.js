import React, { PureComponent } from 'react'
import FontAwesomeSymbol from 'react-fontawesome'
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

    const content = name.length > 1
      ? <FontAwesomeSymbol name={name} className={styles.fontAwesome} {...this.props} />
      : <div className={styles.fontAwesome}>{name}</div>

    return (
      content
    )
  }
}
