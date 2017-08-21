import PropTypes from 'prop-types'
import React from 'react'
import { storiesOf, setAddon } from '@kadira/storybook'
import infoAddon from '@kadira/react-storybook-addon-info'
import { browserHistory } from 'react-router'
import { withContext } from 'recompose'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const addWithInfo = {
  ...infoAddon,
  addWithInfo(title, story, options) {
    return infoAddon.addWithInfo.call(this, title, story, {
      source: true,
      inline: false,
      header: false,
      ...options
    })
  }
}

const presets = {
  demo: {
    routing: {
      locationBeforeTransitions: {
        search: '?demo'
      }
    }
  }
}

const addWithStore = {
  addWithStore(preset, title, story, options) {
    const store = createStore(state => state, presets[preset] || preset)

    return this.addWithInfo(title, () => (
      <Provider store={store}>
        {story()}
      </Provider>
    ), options)
  }
}

setAddon(addWithInfo)
setAddon(addWithStore)

export default name => storiesOf(name, module)
  .addDecorator(story => {
    const Component = withContext(
      {
        router: PropTypes.object
      },
      () => ({
        router: browserHistory
      }),
    )(story)

    return <Component />
  })
  .addDecorator(story =>
    (<div
      style={{
        fontFamily: 'Open Sans'
      }}
    >
      {story()}
    </div>)
  )
