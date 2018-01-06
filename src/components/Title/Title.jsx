import React, { PureComponent, PropTypes as pt } from 'react'
import cx from 'classnames'
import styles from './Title.styl'

export default class Title extends PureComponent {
  static propTypes = {
    level: pt.oneOf([1, 2, 3, 4, 5, 6]),
    thin: pt.bool,
    margin: pt.bool,
    center: pt.bool,
    upperCase: pt.bool,
    children: pt.node
  }

  static defaultProps = {
    level: 1
  }

  render() {
    const {
      level,
      thin,
      margin,
      center,
      upperCase,
      children
    } = this.props
    const Component = `h${level}`

    return (
      <Component
        className={cx(styles.title, {
          level_1: level === 1,
          level_2: level === 2,
          level_3: level === 3,
          level_4: level === 4,
          level_5: level === 5,
          level_6: level === 6,
          is_thin: thin,
          align_center: center,
          is_uppercase: upperCase,
          with_margin: margin
        })}
      >
        {children}
      </Component>
    )
  }
}
