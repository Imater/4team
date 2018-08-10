import R from 'ramda'
import { connect } from 'react-redux'
import { setActiveTask, fetch as getTotalTaskTime } from 'redux/modules/tasks'
import Tasks from 'components/Tasks'

export default R.compose(
  connect(
    ({
      userData: { companyId, email },
      auth: { token }
    }) => ({
      companyId,
      email,
      token
    }), {
      setActiveTask,
      getTotalTaskTime
    }
  )
)(Tasks)
