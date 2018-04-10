import React, { PureComponent, PropTypes as pt } from 'react'
import { Button, FormControl, Glyphicon } from 'react-bootstrap'
import Text from 'components/Text'

import styles from './Iframe.styl'

export default class Iframe extends PureComponent {
  static propTypes = {
    totalTime: pt.string,
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

  handleReload = () =>
    this.setState({ url: `${this.state.url} ` })

  handleClick = () =>
    console.log('click')

  handleChange = e =>
    this.setState({ url: e.target.value })

  handleShowPanel = () => {
    console.log('test')
  }

  render() {
    const { url } = this.state
    const { totalTime } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <div className={styles.home}>
            <Button onClick={this.handleReload}>
              <Glyphicon glyph='home' />
            </Button>
          </div>

          <div className={styles.url}>
            <FormControl
              type='text'
              value={url}
              onClick={this.handleClick}
              // onChange={this.handleChange}
            />
          </div>

          <Button onClick={this.handleShowPanel}>
            <Text
              size={14}
              nowrap
            >
              {totalTime}
            </Text>
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
