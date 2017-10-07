import PropTypes from 'prop-types'
/* eslint-disable global-require,react/no-danger */
import React from 'react'
import { renderToString } from 'react-dom/server'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */

const Html = ({ assets, component, store }) => {
  const content = component ? renderToString(component) : ''
  const head = Helmet.rewind()
  return (
    <html lang='ru-RU'>
      <head>
        {head.base.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {head.style.toComponent()}
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' />
        <link rel='shortcut icon' href='/favicon.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        {/* styles (will be present only in production with webpack extract text plugin) */}
        {Object.keys(assets.styles).map((style, key) =>
          (<link
            href={assets.styles[style]}
            key={key}
            media='screen, projection'
            rel='stylesheet'
            type='text/css'
            charSet='UTF-8'
          />)
        )}
      </head>
      <body>
        <div id='content' dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }} charSet='UTF-8' />
        {['manifest', 'vendor', 'main'].map((srcName, key) =>
          (<script
            key={key}
            src={assets.javascript[srcName]}
            charSet='UTF-8'
          />)
        )}
      </body>
    </html>
  )
}

Html.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object
}

export default Html
