import React, { PureComponent, PropTypes as pt } from 'react'
import { Button } from 'react-bootstrap'
import Text from 'components/Text'
import R from 'ramda'

import styles from './Tasks.styl'

export default class Tasks extends PureComponent {
  static propTypes = {
    tasks: pt.array,
    setActiveTask: pt.func,
    companyId: pt.number,
    email: pt.string,
    token: pt.string,
    getTotalTaskTime: pt.func
  }

  static defaultProps = {
    tasks: [],
    setActiveTask: () => {},
    getTotalTaskTime: () => {}
  }

  handleClick = url => () => {
    const {
      setActiveTask,
      getTotalTaskTime,
      companyId,
      email,
      token
    } = this.props

    setActiveTask(url)
    getTotalTaskTime({ companyId, email, description: url, token })
  }

  renderTask = ({ id, description, time }, key) => (
    <li
      key={key}
      className={styles.task}
    >
      <Button
        className={styles.button}
        bsStyle='link'
        onClick={this.handleClick(id)}
        disabled={R.isNil(id)}
      >
        <Text size={16}>
          <span dangerouslySetInnerHTML={{ __html: description }} />
        </Text>
      </Button>

      <div className={styles.time}>
        <Text
          size={16}
          nowrap
        >
          {time}
        </Text>
      </div>
    </li>
  )

  render() {
    const { tasks } = this.props

    return (
      <ol className={styles.tasks}>
        {tasks.map(this.renderTask)}
      </ol>
    )
  }
}
