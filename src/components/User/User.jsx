import React, { PureComponent, PropTypes as pt } from 'react'
import WorkDay from 'components/WorkDay'
import Tasks from 'components/Tasks'

import styles from './User.styl'

export default class User extends PureComponent {
  static propTypes = {
    days: pt.object
  }

  static defaultProps = {
    days: {}
  }

  renderDay(day, tasks) {
    return (
      <div
        key={day}
        className={styles.day}
      >
        {this.renderHeader(day)}

        <Tasks tasks={tasks} />
      </div>
    )
  }

  render() {
    const { days } = this.props

    return (
      <aside className={styles.user}>
        {Object.keys(days).map(day => (
          <WorkDay caption={day}>
            <Tasks tasks={days[day]} />
          </WorkDay>
        ))}
      </aside>
    )
  }
}
