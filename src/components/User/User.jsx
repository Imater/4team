import React, { PureComponent, PropTypes as pt } from 'react'
import { Link } from 'react-router'
import R from 'ramda'
import WorkDay from 'components/WorkDay'
import Tasks from 'containers/Tasks'
import Text from 'components/Text'

import styles from './User.styl'

export default class User extends PureComponent {
  static propTypes = {
    days: pt.array,
    user: pt.string,
    page: pt.number,
    handleSubmit: pt.func
  }

  static defaultProps = {
    days: [],
    handleSubmit: () => {}
  }

  renderDay = ({ date, tasks, totalTime }) => {
    const { handleSubmit } = this.props

    return (
      <div
        key={date}
        className={styles.day}
      >
        <WorkDay
          caption={date}
          time={totalTime}
          onBlur={handleSubmit}
        >
          <Tasks tasks={tasks} />
        </WorkDay>
      </div>
    )
  }

  render() {
    const {
      days,
      user,
      page
    } = this.props
    const nextPage = page + 1

    return (
      <form className={styles.user}>
        {R.isEmpty(days) ?
          <Text size={16}>
            Задач нет
          </Text> :
          <div className={styles.days}>
            {days.map(this.renderDay)}

            <Link
              className={styles.link}
              to={`/users/${user}?page=${nextPage}`}
            >
              <Text size={16}>
                Еще...
              </Text>
            </Link>
          </div>}
      </form>
    )
  }
}
