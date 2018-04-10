import React, { PureComponent, PropTypes as pt } from 'react'
import { Button, FormControl, Glyphicon, Jumbotron } from 'react-bootstrap'
import Tasks from 'containers/Tasks'
import Text from 'components/Text'
import { copy } from 'utils/copy'

import styles from './Iframe.styl'

export default class Iframe extends PureComponent {
  static propTypes = {
    totalTime: pt.string,
    url: pt.string.isRequired,
    taskItems: pt.array
  }

  static defaultProps = {
    taskItems: []
  }

  constructor(props) {
    super(props)

    this.state = {
      url: this.props.url,
      copied: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.url !== nextProps.url) {
      this.setState({
        url: nextProps.url,
        showPanel: false
      })
    }
  }

  handleReload = () =>
    this.setState({ url: `${this.state.url} ` })

  handleCopyEnd = () =>
    setTimeout(() => {
      this.setState({ copied: false })
    }, 1000)

  handleClick = () => {
    copy(this.state.url)
    this.setState({ copied: true }, this.handleCopyEnd)
  }

  handleChange = e =>
    this.setState({ url: e.target.value })

  handleShowPanel = () =>
    this.setState({ showPanel: !this.state.showPanel })

  render() {
    const { url, copied, showPanel } = this.state
    const { totalTime, taskItems } = this.props

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
              value={url.trim()}
              onClick={this.handleClick}
              // onChange={this.handleChange}
            />

            {copied &&
              <div className={styles.tooltip}>
                Адрес скопирован
              </div>}
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

        {showPanel &&
          <div className={styles.panel}>
            <Tasks tasks={taskItems} />
          </div>}

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
