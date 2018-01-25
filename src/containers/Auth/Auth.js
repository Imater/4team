import { compose } from 'ramda'
// import preventRenderWhileLoading from 'utils/decorators/preventRenderWhileLoading'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { sendToken } from 'redux/modules/auth'
import Auth from 'components/Auth'

export default compose(
  // preventRenderWhileLoading(),
  connect(() => ({}), {
    onSubmit: sendToken
  }),
  reduxForm({
    form: 'auth'
  })
)(Auth)
