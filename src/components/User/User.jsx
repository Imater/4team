import React, { PureComponent, PropTypes as pt } from 'react'
import WorkDay from 'components/WorkDay'
import Tasks from 'containers/Tasks'

import styles from './User.styl'

export default class User extends PureComponent {
  static propTypes = {
    days: pt.object
  }

  static defaultProps = {
    days: {}
  }

  renderDay = (day, index) => {
    const { days } = this.props

    return (
      <div
        key={index}
        className={styles.day}
      >
        <WorkDay caption={day}>
          <Tasks tasks={days[day]} />
        </WorkDay>
      </div>
    )
  }

  render() {
    const { days } = this.props

    return (
      <aside className={styles.user}>
        {Object.keys(days).map(this.renderDay)}
      </aside>
    )
  }
}
