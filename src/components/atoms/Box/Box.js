import React, { PureComponent } from 'react'
import { number, string, bool, node } from 'prop-types'
import cx from 'classnames'

import styles from './Box.sss'

export default class Box extends PureComponent {
  static propTypes = {
    size: number,
    color: string,
    backgroundColor: string,
    children: node,
    isFirst: bool,
    isLast: bool
  }

  static defaultProps = {
    size: 36,
    color: '#B1FF89',
    backgroundColor: '#2A5D10',
    isFirst: false,
    isLast: false
  }

  render() {
    const {
      size,
      color,
      backgroundColor,
      isFirst,
      isLast,
      children
    } = this.props

    return (
      <div
        className={cx(styles.box, {
          [styles.box_isFirst]: isFirst,
          [styles.box_isLast]: isLast
        })}
        style={{ width: size, minHeight: size, color, backgroundColor }}
      >
        {children}
      </div>
    )
  }
}
