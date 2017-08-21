/* eslint-disable react/require-optimization */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import pureRender from 'pure-render-decorator'
import hoistStatics from 'hoist-non-react-statics'
import { push } from 'react-router-redux'

export default ({ to = '/', whenAuthorized }) => WrappedComponent => {
  @connect(
    ({
      token
    }) => ({
      isUserWithoutPassword: token.isUserWithoutPassword
    })
  )
  @pureRender
  class Redirect extends React.Component {
    static displayName = `Redirect(${WrappedComponent.displayName || WrappedComponent.name})`;

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      isUserWithoutPassword: PropTypes.bool
    }

    componentDidMount() {
      const { isUserWithoutPassword } = this.props
      if (isUserWithoutPassword ^ whenAuthorized) {
        this.redirect()
      }
    }

    componentWillReceiveProps(nextProps) {
      const { isUserWithoutPassword } = nextProps
      if (isUserWithoutPassword ^ whenAuthorized) {
        this.redirect()
      }
    }

    redirect() {
      const { dispatch } = this.props
      dispatch(push({
        pathname: to
      }))
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
        />
      )
    }
  }

  return hoistStatics(Redirect, WrappedComponent)
}
