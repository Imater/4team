import React, { PureComponent, PropTypes as pt } from 'react'
import styles from './Split.styl'

export default class Split extends PureComponent {
  static propTypes = {
    left: pt.node,
    right: pt.node
  }

  componentDidMount() {
    window.Split(['#left', '#right'], {
      sizes: [50, 50],
      elementStyle: (dimension, size, gutterSize) => ({
        'flex-basis': `calc(${size}% - ${gutterSize}px`
      }),
      gutterStyle: (dimension, gutterSize) => ({
        'flex-basis': `${gutterSize}px`
      })
    })
  }

  render() {
    const { left, right } = this.props

    return (
      <div className={styles.split}>
        <div
          id='left'
          className={styles.left}
        >
          {left}
        </div>

        <div
          id='right'
          className={styles.right}
        >
          {right}
        </div>
      </div>
    )
  }
}
