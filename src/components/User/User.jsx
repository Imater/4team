import React, { PureComponent, PropTypes as pt } from 'react'
import R from 'ramda'
import WorkDay from 'components/WorkDay'
import Tasks from 'containers/Tasks'
import Text from 'components/Text'

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
      <div className={styles.user}>
        {R.isEmpty(days) ?
          <Text size={16}>
            Задач нет
          </Text> :
          Object.keys(days).map(this.renderDay)}
      </div>
    )
  }
}
