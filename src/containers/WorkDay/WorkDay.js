import R from 'ramda'
import { connect } from 'react-redux'
import WorkDay from 'components/WorkDay'

export default R.compose(
  connect(
    ({
      comments: { user }
    }) => ({
      user,
      form: `${user}`
    })
  )
)(WorkDay)
