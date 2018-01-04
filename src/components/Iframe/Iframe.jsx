import React, { PureComponent, PropTypes as pt } from 'react'
import styles from './Iframe.styl'

export default class Iframe extends PureComponent {
  static propTypes = {
    url: pt.string.isRequired
  }

  render() {
    const { url } = this.props

    return (
      <div className={styles.iframeWrapper}>
        <iframe
          className={styles.iframe}
          title='uniq'
          src={url}
          target='parent'
          frameBorder='0'
        />
      </div>
    )
  }
}
