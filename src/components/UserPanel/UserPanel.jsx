import React, { PureComponent, PropTypes as pt } from 'react'
import { Button, Glyphicon } from 'react-bootstrap'
import styles from './UserPanel.styl'

export default class UserPanel extends PureComponent {
  static propTypes = {
    users: pt.array
  }

  static defaultProps = {
    users: []
  }

  renderUser({ name }, key) {
    return (
      <div
        key={key}
        className={styles.user}
      >
        <Button>
          <div className={styles.wrapper}>
            <Glyphicon glyph='user' />

            {name}
          </div>
        </Button>
      </div>
    )
  }

  render() {
    const { users } = this.props

    return (
      <aside className={styles.userPanel}>
        {users.map(this.renderUser)}
      </aside>
    )
  }
}
