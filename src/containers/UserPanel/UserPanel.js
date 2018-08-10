import R from 'ramda'
import { connect } from 'react-redux'
import UserPanel from 'components/UserPanel'
import { fetchProjectUsers } from 'redux/modules/users'

export default R.compose(
  connect(
    ({
      auth: { token },
      users,
      projects
    }) => ({
      token,
      users: R.prop('users', users),
      projects: R.prop('items', projects)
    }), {
      fetchProjectUsers
    }
  )
)(UserPanel)
