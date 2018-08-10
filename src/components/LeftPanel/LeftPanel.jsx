import React, { PureComponent, PropTypes as pt } from 'react'

import styles from './LeftPanel.styl'

export default class LeftPanel extends PureComponent {
  static propTypes = {
    children: pt.node
  }

  render() {
    const { children } = this.props

    return (
      <div className={styles.leftPanel}>
        {children}
      </div>
    )
  }
}
