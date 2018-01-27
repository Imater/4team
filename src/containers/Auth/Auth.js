import { compose } from 'ramda'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { setToken } from 'redux/modules/auth'
import Auth from 'components/Auth'

export default compose(
  connect(
    ({
      auth: {
        isAuthorized
      }
    }) => ({
      isAuthorized
    }), {
      onSubmit: setToken
    }
  ),
  reduxForm({
    form: 'auth'
  })
)(Auth)
