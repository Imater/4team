import React, { PureComponent } from 'react'
import { number, string, bool, node } from 'prop-types'
import cx from 'classnames'
import Box from '../../atoms/Box'
import FontAwesome from '../../atoms/FontAwesome'

import styles from './TabPinned.sss'

export default class TabPinned extends PureComponent {
  static propTypes = {
    size: number,
    color: string,
    backgroundColor: string,
    icon: string,
    isDisabled: bool,
    children: node
  }

  static defaultProps = {
    size: 40,
    color: '#FFFFFF',
    backgroundColor: '#FC6B3E',
    isDisabled: false
  }

  render() {
    const {
      size,
      color,
      backgroundColor,
      icon,
      isDisabled,
      children
    } = this.props

    const isIcon = !!icon
    const content = isIcon ? <FontAwesome name={icon} /> : children

    return (
      <div
        className={cx(styles.tabPinned, {
          [styles.tabPinned_isDisabled]: isDisabled
        })}
        style={{ width: size }}
      >
        <Box size={size} color={color} backgroundColor={backgroundColor}>
          {content}
        </Box>
      </div>
    )
  }
}

