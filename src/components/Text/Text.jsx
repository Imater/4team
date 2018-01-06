import React, { PureComponent, PropTypes as pt } from 'react'
import cx from 'classnames'
import styles from './Text.styl'

export default class Text extends PureComponent {
  static propTypes = {
    children: pt.node,
    size: pt.oneOf([
      12, 14, 16, 18,
      20, 22, 24, 28,
      32, 36, false
    ]),
    margin: pt.bool,
    ellipsis: pt.bool,
    align: pt.oneOf(['left', 'center', 'right', 'justify'])
  }

  static defaultProps = {
    children: '',
    align: 'left'
  }

  render() {
    const {
      children,
      size,
      margin,
      ellipsis,
      align
    } = this.props

    return (
      <p
        className={cx(styles.text, {
          [styles.size_12]: size === 12,
          [styles.size_14]: size === 14,
          [styles.size_16]: size === 16,
          [styles.size_18]: size === 18,
          [styles.size_20]: size === 20,
          [styles.size_22]: size === 22,
          [styles.size_24]: size === 24,
          [styles.size_28]: size === 28,
          [styles.size_32]: size === 32,
          [styles.size_36]: size === 36,
          [styles.with_margin]: margin,
          [styles.mode_ellipsis]: ellipsis,
          [styles.align_center]: align === 'center',
          [styles.align_right]: align === 'right',
          [styles.align_justify]: align === 'justify'
        })}
      >
        {children}
      </p>
    )
  }
}
