import React, { PureComponent } from 'react'
import { number, string, bool, node } from 'prop-types'

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

    const borderRadius = Math.round(size / 3.5)
    const fontSize = Math.round(size / 2.25)
    const lineHeight = `${size}px`

    return (
      <div
        className={styles.box}
        style={{
          width: size,
          minHeight: size,
          fontSize,
          lineHeight,
          color,
          backgroundColor,
          borderTopRightRadius: isFirst ? borderRadius : null,
          borderBottomLeftRadius: isLast ? borderRadius : null
        }}
      >
        {children}
      </div>
    )
  }
}
