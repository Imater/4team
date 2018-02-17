import React, { PureComponent, PropTypes as pt } from 'react'

import styles from './User.styl'

export default class User extends PureComponent {
  static propTypes = {
    users: pt.array
  }

  static defaultProps = {
    users: []
  }

  render() {
    const { users } = this.props

    return (
      <aside className={styles.user}>
        {users.map(this.renderUser)}
      </aside>
    )
  }
}
