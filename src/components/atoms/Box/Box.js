import React, { PureComponent } from 'react'
import { number, string, bool } from 'prop-types'
import Icon from '../Icon'

import styles from './Box.styl'

export default class Box extends PureComponent {
  static propTypes = {
    size: number,
    color: string,
    backgroundColor: string,
    children: string,
    isFirst: bool,
    isLast: bool,
    name: string
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
      children,
      name
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
        <Icon name={name} />
        {children}
      </div>
    )
  }
}
