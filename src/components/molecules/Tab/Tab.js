import React, { PureComponent } from 'react'
import { number, string, bool, func } from 'prop-types'
import cx from 'classnames'
import Box from '../../atoms/Box'
import FontAwesome from '../../atoms/FontAwesome'

import styles from './Tab.sss'

export default class Tab extends PureComponent {
  static propTypes = {
    size: number,
    color: string,
    backgroundColor: string,
    iconColor: string,
    iconBackgroundColor: string,
    icon: string,
    activeColor: string,
    isActive: bool,
    isDisabled: bool,
    onClick: func,
    isWithCross: bool,
    isHideOnHover: bool,
    onClickOnCross: func,
    children: string
  }

  static defaultProps = {
    size: 40,
    color: '#FFFFFF',
    backgroundColor: '#000000',
    activeColor: '#FFFFFF',
    isActive: false,
    isDisabled: false,
    isWithCross: false,
    isHideOnHover: false,
    onClick: () => {},
    onClickOnCross: () => {}
  }

  componentDidMount() {
    const textWidth = this.hideNode.clientWidth
    const containerWidth = this.textNode.clientWidth
    if (containerWidth < textWidth) {
      this.textNode.setAttribute('title', this.props.children)
      this.textNode.classList.add(styles.tab__text_tooltip)
    }
  }

  render() {
    const {
      size,
      color,
      backgroundColor,
      icon,
      iconColor,
      iconBackgroundColor,
      isActive,
      activeColor,
      isDisabled,
      onClick,
      isWithCross,
      isHideOnHover,
      onClickOnCross,
      children
    } = this.props

    const isIcon = !!icon
    const boxSize = size - 10

    return (
      <div
        className={cx(styles.tab, {
          [styles.tab_isDisabled]: isDisabled,
          [styles.tab_isActive]: isActive
        })}
        onClick={onClick}
        style={{
          height: size,
          lineHeight: `${boxSize}px`,
          color,
          backgroundColor
        }}
      >
        { isActive &&
          <div
            className={styles.tab__activeMark}
            style={{
              backgroundColor: activeColor
            }}
          />
        }
        { isIcon &&
          <div className={styles.tab__icon}>
            <Box
              size={boxSize}
              color={iconColor}
              backgroundColor={iconBackgroundColor}
            >
              <FontAwesome name={icon} />
            </Box>
          </div>
        }
        <span
          className={styles.tab__text}
          ref={node => {
            this.textNode = node
            return this.textNode
          }}
        >
          {children}
        </span>
        <span
          className={styles.tab__measuringText}
          ref={node => {
            this.hideNode = node
            return this.hideNode
          }}
        >
          {children}
        </span>
        { isWithCross &&
          <button
            className={cx(styles.tab__cross, {
              [styles.tab__cross_hide]: isHideOnHover
            })}
            type='button'
            onClick={onClickOnCross}
            style={{
              width: boxSize,
              height: boxSize,
              color
            }}
          >
            <FontAwesome name='close' />
          </button>
        }
      </div>
    )
  }
}

/*
style={{ width: size }}
*/
