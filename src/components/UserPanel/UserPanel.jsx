import React, { PureComponent, PropTypes as pt } from 'react'
import { Link } from 'react-router'
import { FormControl } from 'react-bootstrap'
import Text from 'components/Text'

import styles from './UserPanel.styl'

export default class UserPanel extends PureComponent {
  static propTypes = {
    token: pt.string,
    users: pt.array,
    projects: pt.array,
    fetchProjectUsers: pt.func
  }

  static defaultProps = {
    users: [],
    projects: [],
    fetchProjectUsers: () => {}
  }

  handleSelectProject = e =>
    this.props.fetchProjectUsers({
      id: e.target.value,
      token: this.props.token
    })

  renderUser = ({ id, name }, key) => (
    <div
      key={key}
      className={styles.user}
    >
      <Link
        className={styles.link}
        activeClassName={styles.link_active}
        to={`/users/${id}`}
      >
        <Text size={16}>
          {name}
        </Text>
      </Link>
    </div>
  )

  renderOption = ({ id, name }) => (
    <option
      key={id}
      value={id}
    >
      {name}
    </option>
  )

  render() {
    const {
      users,
      projects
    } = this.props

    return (
      <aside className={styles.userPanel}>
        <div className={styles.users}>
          {users.map(this.renderUser)}
        </div>

        <div className={styles.projects}>
          <FormControl
            componentClass='select'
            placeholder='Проект'
            onChange={this.handleSelectProject}
          >
            <option
              value=''
              selected
              disabled
            >
              Проект
            </option>

            {projects.map(this.renderOption)}
          </FormControl>
        </div>
      </aside>
    )
  }
}
