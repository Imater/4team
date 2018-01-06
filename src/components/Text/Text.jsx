import React, { PureComponent, PropTypes as pt } from 'react'
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
        className={styles('text', {
          size_12: size === 12,
          size_14: size === 14,
          size_16: size === 16,
          size_18: size === 18,
          size_20: size === 20,
          size_22: size === 22,
          size_24: size === 24,
          size_28: size === 28,
          size_32: size === 32,
          size_36: size === 36,
          with_margin: margin,
          mode_ellipsis: ellipsis,
          align_center: align === 'center',
          align_right: align === 'right',
          align_justify: align === 'justify'
        })}
      >
        {children}
      </p>
    )
  }
}
