import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import hoistStatics from 'hoist-non-react-statics'

export default () => WrappedComponent => {
  @connect(
    ({
      reduxAsyncConnect: { loaded: reduxAsyncConnectLoaded },
      updateData: { loaded: updateDataLoaded }
    }) => ({
      reduxAsyncConnectLoaded,
      updateDataLoaded
    })
  )
  class PreventRenderWhileLoading extends React.Component {
    static displayName = `PreventRenderWhileLoading(${WrappedComponent.displayName || WrappedComponent.name})`;

    static propTypes = {
      loaded: PropTypes.bool
    }

    shouldComponentUpdate({ reduxAsyncConnectLoaded, updateDataLoaded }) {
      return reduxAsyncConnectLoaded && updateDataLoaded
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
