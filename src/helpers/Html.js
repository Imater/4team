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
        <link href='https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css' rel='stylesheet' />
        <link href='https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' />
        <link
          href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
          rel='stylesheet'
          integrity='sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN'
          crossOrigin='anonymous'
        />
        <script src='https://p.trellocdn.com/embed.min.js' />
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
