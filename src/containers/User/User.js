import R from 'ramda'
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import moment from 'moment'
import { fetch as fetchReports } from 'redux/modules/reports'
import User from 'components/User'

const getUserById = createSelector(
  R.pathOr('', ['users', 'users']),
  (state, id) => id,
  (users, id) => R.find(R.propEq('id', Number(id)), users)
)

export default R.compose(
  asyncConnect([{
    promise: ({ store, params: { id } }) => {
      const user = getUserById(store.getState(), id)

      store.dispatch(fetchReports({
        companyId: R.pathOr('', ['userData', 'companyId'], store.getState()),
        email: R.prop('email', user),
        uid: R.prop('uid', user),
        since: moment(new Date()).subtract(10, 'days').format('YYYY-MM-DD'),
        until: moment(new Date()).format('YYYY-MM-DD'),
        token: R.pathOr('', ['auth', 'token'], store.getState())
      }))
    }
  }]),
  connect(
    ({
      reports
    }) => ({
      days: R.path(['days'], reports)
    })
  )
)(User)
