import React, { PureComponent, PropTypes as pt } from 'react'
import { Button } from 'react-bootstrap'
import Text from 'components/Text'
import styles from './Tasks.styl'

export default class Tasks extends PureComponent {
  static propTypes = {
    tasks: pt.array
  }

  static defaultProps = {
    tasks: []
  }

  handleClick = url => () => {
    console.log(url) // TODO: метод из хранилища
  }

  renderTask = ({ name, url, time }, key) => (
    <div
      key={key}
      className={styles.task}
    >
      <Button
        className={styles.button}
        bsStyle='link'
        onClick={this.handleClick(url)}
      >
        {name}
      </Button>

      <div className={styles.time}>
        <Text>
          {time}
        </Text>
      </div>
    </div>
  )

  render() {
    const { tasks } = this.props

    return (
      <div className={styles.tasks}>
        {tasks.map(this.renderTask)}
      </div>
    )
  }
}
