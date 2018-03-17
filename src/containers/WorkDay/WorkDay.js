import R from 'ramda'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { saveDayComment } from 'redux/modules/workday'
import WorkDay from 'components/WorkDay'

export default R.compose(
  connect(
    () => ({})
  ),
  reduxForm({
    form: 'dayComment',
    onSubmit: (values, dispatch) => dispatch(saveDayComment(values))
  })
)(WorkDay)
