import R from 'ramda'
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { reduxForm } from 'redux-form'
import moment from 'moment'
import { fetch as fetchReports } from 'redux/modules/reports'
import { loadComments, saveComments } from 'redux/modules/comments'
import User from 'components/User'

const getUserById = createSelector(
  R.pathOr('', ['users', 'users']),
  (state, id) => id,
  (users, id) => R.find(R.propEq('id', Number(id)), users)
)

export default R.compose(
  asyncConnect([{
    promise: ({ store, params: { id }, location }) => {
      const user = getUserById(store.getState(), id)
      const page = R.pathOr(1, ['query', 'page'], location)

      store.dispatch(fetchReports({
        companyId: R.pathOr('', ['userData', 'companyId'], store.getState()),
        email: R.prop('email', user),
        uid: R.prop('uid', user),
        since: moment(new Date()).subtract(365, 'days').format('YYYY-MM-DD'),
        until: moment(new Date()).format('YYYY-MM-DD'),
        token: R.pathOr('', ['auth', 'token'], store.getState()),
        page
      }))

      store.dispatch(loadComments(id))
    }
  }]),
  connect(
    ({
      reports,
      comments: { user, days }
    }) => ({
      days: R.prop('days', reports),
      page: parseInt(R.prop('page', reports), 10),
      user,
      initialValues: R.prop(user, days)
    }), {
      onSubmit: saveComments
    }
  ),
  reduxForm({
    form: 'comments',
    enableReinitialize: true
  })
)(User)
