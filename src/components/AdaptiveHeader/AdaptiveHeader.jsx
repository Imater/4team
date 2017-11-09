import React, { PureComponent, PropTypes } from 'react'
import styles from './AdaptiveHeader.sss'

class AdaptiveHeader extends PureComponent {
  static propTypes = {
    containerQuery: PropTypes.object
  }
  render() {
    return (
      <div>
        <div className={styles.adaptiveHeader}>
          Feed me with components
        </div>
      </div>
    )
  }
}

export default AdaptiveHeader

