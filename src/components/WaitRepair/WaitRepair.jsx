import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import styles from './WaitRepair.styl'

@pureRender
export default class WaitRepair extends Component {
  render() {
    return (
      <img
        width={150}
        height={150}
        role='presentation'
        className={styles.WaitRepair}
        src={'/Technical/animated.gif'}
      />
    )
  }
}
