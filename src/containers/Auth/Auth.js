import { compose } from 'ramda'
// import preventRenderWhileLoading from 'utils/decorators/preventRenderWhileLoading'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { setToken } from 'redux/modules/auth'
import Auth from 'components/Auth'

export default compose(
  // preventRenderWhileLoading(),
  connect(() => ({}), {
    onSubmit: setToken
  }),
  reduxForm({
    form: 'auth'
  })
)(Auth)
