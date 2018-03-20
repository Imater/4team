import React, { PureComponent, PropTypes as pt } from 'react'
import { Link } from 'react-router'
import Text from 'components/Text'

import styles from './UserPanel.styl'

export default class UserPanel extends PureComponent {
  static propTypes = {
    users: pt.array
  }

  static defaultProps = {
    users: []
  }

  renderUser = ({ id, name }, key) => (
    <div
      key={key}
      className={styles.user}
    >
      <Link
        className={styles.link}
        activeClassName={styles.link_active}
        to={`/user/${id}`}
      >
        <Text size={16}>
          {name}
        </Text>
      </Link>
    </div>
  )

  render() {
    const { users } = this.props

    return (
      <aside className={styles.userPanel}>
        {users.map(this.renderUser)}
      </aside>
    )
  }
}
