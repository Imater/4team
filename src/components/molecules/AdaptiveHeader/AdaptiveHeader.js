import React, { PureComponent, PropTypes } from 'react'
import styles from './AdaptiveHeader.styl'
import Tabs from '../Tabs/Tabs'

class AdaptiveHeader extends PureComponent {
  static propTypes = {
    containerQuery: PropTypes.object
  }
  render() {
    return (
      <div className={styles.adaptiveHeader}>
        <Tabs />
      </div>
    )
  }
}

export default AdaptiveHeader

