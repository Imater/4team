import React, { PureComponent } from 'react'
import { node } from 'prop-types'

import styles from './Box.sss'

export default class Box extends PureComponent {
  static propTypes = {
    children: node
  }

  static defaultProps = {

  }

  render() {
    // const {  } = this.props

    return (
      <div className={styles.box}>
        {this.props.children}
      </div>
    )
  }
}
