import React, { PureComponent, PropTypes as pt } from 'react'
import { Button } from 'react-bootstrap'

import styles from './Iframe.styl'

export default class Iframe extends PureComponent {
  static propTypes = {
    url: pt.string.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      url: this.props.url
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.url !== nextProps.url) {
      this.setState({ url: nextProps.url })
    }
  }

  // handleBack = () =>
  //   this.iframe.contentWindow.history.back()

  handleReload = () =>
    this.setState({ url: `${this.state.url} ` })

  render() {
    const { url } = this.state

    return (
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          {/*<Button*/}
            {/*bsStyle='link'*/}
            {/*onClick={this.handleBack}*/}
          {/*>*/}
            {/*Назад*/}
          {/*</Button>*/}

          <Button
            bsStyle='link'
            onClick={this.handleReload}
          >
            Обновить
          </Button>
        </div>

        <iframe
          className={styles.iframe}
          title='uniq'
          src={url}
          target='parent'
          frameBorder='0'
          ref={el => { this.iframe = el }}
        />
      </div>
    )
  }
}
