import R from 'ramda'
import { connect } from 'react-redux'
import { setActiveTask } from 'redux/modules/tasks'
import Tasks from 'components/Tasks'

export default R.compose(
  connect(
    () => ({}), {
      setActiveTask
    }
  )
)(Tasks)
