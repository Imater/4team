import React, { PureComponent, PropTypes as pt } from 'react'
import { Glyphicon } from 'react-bootstrap'
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
      <Link to={`/user/${id}`}>
        <div className={styles.wrapper}>
          <Glyphicon glyph='user' />

          <Text size={16}>
            {name}
          </Text>
        </div>
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
