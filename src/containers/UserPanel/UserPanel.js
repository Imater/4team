import R from 'ramda'
import { connect } from 'react-redux'
import UserPanel from 'components/UserPanel'

export default R.compose(
  connect(
    ({
      users
    }) => ({
      users: R.path(['users'], users)
    })
  )
)(UserPanel)
