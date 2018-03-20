import React, { PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import hoistStatics from 'hoist-non-react-statics'

export default () => WrappedComponent => {
  @connect(
    ({
      reduxAsyncConnect: { loaded: reduxAsyncConnectLoaded }
    }) => ({
      reduxAsyncConnectLoaded
    })
  )
  class PreventRenderWhileLoading extends React.Component {
    static displayName =
      `PreventRenderWhileLoading(${
        WrappedComponent.displayName ||
        WrappedComponent.name
      })`

    static propTypes = {
      loaded: pt.bool
    }

    shouldComponentUpdate({ reduxAsyncConnectLoaded }) {
      return reduxAsyncConnectLoaded
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
        />
      )
    }
  }

  return hoistStatics(PreventRenderWhileLoading, WrappedComponent)
}
