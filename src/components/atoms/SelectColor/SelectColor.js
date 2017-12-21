import React, { PureComponent } from 'react'
import { number, string, func, arrayOf } from 'prop-types'
import cx from 'classnames'
import Icon from '../Icon'

import styles from './SelectColor.styl'

export default class SelectColor extends PureComponent {
  static propTypes = {
    size: number,
    colorsArray: arrayOf(arrayOf(string)),
    currentColorIndex: number,
    onChangeColor: func
  }

  static defaultProps = {
    size: 36,
    onChangeColor: () => {}
  }

  render() {
    const {
      size,
      colorsArray,
      currentColorIndex,
      onChangeColor
    } = this.props

    const renderColorBox = (color, backgroundColor, index, isActive) => ((
      <label
        className={cx(styles.selectColor__colorBox, {
          [styles.selectColor__colorBox_state_active]: isActive
        }

        )}
        key={`color${index}`}
        style={{
          width: size,
          height: size,
          color,
          backgroundColor
        }}
      >
        <input
          className={styles.selectColor__input}
          value={index}
          name={'colorTheme'}
          type={'radio'}
          checked={isActive}
          onChange={onChangeColor}
        />
        { isActive &&
          <div
            className={styles.selectColor__colorBoxChecked}
            style={{
              width: size,
              height: size
            }}
          >
            <Icon name='check' />
          </div>
        }
      </label>
    ))

    const fontSize = Math.round(size / 2.25)

    return (
      <div
        className={styles.selectColor}
        style={{
          width: size,
          height: size,
          fontSize
        }}
      >
        {colorsArray.map((itemColor, index) => {
          const isActive = index === currentColorIndex
          return renderColorBox(itemColor[0], itemColor[1], index, isActive)
        })}
        <button
          className={styles.selectColor__reset}
          type='button'
          style={{
            width: size,
            height: size,
            fontSize
          }}
        >
          <Icon name='times' />
        </button>
      </div>
    )
  }
}
