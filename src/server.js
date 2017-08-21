/* eslint-disable no-console */

import path from 'path'
import http from 'http'
import Express from 'express'
import PrettyError from 'pretty-error'
import React from 'react'
import { renderToString } from 'react-dom/server'
import favicon from 'serve-favicon'
import compression from 'compression'
import bodyParser from 'body-parser'
import httpProxy from 'http-proxy'
import cookieParser from 'cookie-parser'
import reactCookie from 'helpers/react-cookie'
import { match } from 'react-router'
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect'
import { syncHistoryWithStore } from 'react-router-redux'
import createHistory from 'react-router/lib/createMemoryHistory'
import { Provider } from 'react-redux'
import axios from 'axios'
import { Provider as ProviderTunnel } from 'react-tunnel'
import Html from './helpers/Html'
import config from './config'
import createStore from '../src/redux/create'
import getRoutes from './routes'

const pretty = new PrettyError()
const app = new Express()
const server = new http.Server(app)

const authUrl = `${config.authServer}`
const targetUrlAuth = `${authUrl}/oauth`
const proxyAuth = httpProxy.createProxyServer({
  target: targetUrlAuth,
  xfwd: false,
  changeOrigin: true
})

const apiUrl = `${config.apiServer}`
const targetUrlApi = `${apiUrl}/v1`
const proxyApi = httpProxy.createProxyServer({
  target: targetUrlApi,
  xfwd: false,
  changeOrigin: true
})

const targetUrlApi2 = `${apiUrl}/v2`
const proxyApi2 = httpProxy.createProxyServer({
  target: targetUrlApi2,
  xfwd: false,
  changeOrigin: true
})

const targetUrlUpload = `${apiUrl}/upload`
const proxyUpload = httpProxy.createProxyServer({
  target: targetUrlUpload,
  xfwd: false,
  changeOrigin: true
})

// Proxy to API server
app.use('/v1', (req, res) => {
  proxyApi.web(req, res, { target: targetUrlApi })
})

// Proxy to API server (version 2)
app.use('/v2', (req, res) => {
  proxyApi2.web(req, res, { target: targetUrlApi2 })
})

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  const allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3031',
    'http://localhost:3031',
    'http://4team.csssr.ru']
  const origin = req.headers.origin
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

app.use(Express.static(path.join(__dirname, '..', 'static')))

const errorHandler = (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error)
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' })
  }

  res.end(JSON.stringify({ error: 'proxy_error', reason: error.message }))
}

proxyApi.on('error', errorHandler)

proxyApi2.on('error', errorHandler)

// Proxy to oauth API server
app.use('/oauth', (req, res) => {
  proxyAuth.web(req, res, { target: targetUrlAuth })
})
proxyAuth.on('error', errorHandler)

// Proxy for get share count
// Способ немного костыльный, но описан в куче источников
// http://hase.su/kolichestvo-rassharivanij-stranicy-v-socialnyx-setyax/
// https://gist.github.com/ihorvorotnov/9132596
// http://sigov.ru/2012/12/15/shares/
app.get('/share/:name', (req, res) => {
  const url = req.query.url
  const urls = {
    vk: `http://vk.com/share.php?act=count&index=1&url=${url}`,
    fb: `http://graph.facebook.com/?id=${url}`,
    ok: `http://www.odnoklassniki.ru/dk?st.cmd=extOneClickLike&uid=odklocs0&ref=${url}`,
    mailru: `http://connect.mail.ru/share_count?url_list=${url}`
  }

  const link = urls[req.params.name]
  if (!link) {
    res.send({ error: 'Social network not found' })
  } else {
    axios.get(link)
      .then(result => {
        res.send({
          name: req.params.name,
          response: result.data
        })
      })
      .catch(error => {
        res.send({
          name: req.params.name,
          error
        })
      })
  }
})

// Proxy to Upload server
app.use('/upload', (req, res) => {
  proxyUpload.web(req, res, { target: targetUrlUpload })
})
proxyUpload.on('error', errorHandler)

// Proxy to Upload server
app.use('/home/relefopt/beta.relefopt.ru/www/upload/', (req, res) => {
  proxyUpload.web(req, res, { target: targetUrlUpload })
})

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh()
  }

  const cookie = reactCookie()

  cookie.setRawCookie(req.headers.cookie)
  cookie.plugToRequest(req, res)


  const historyNotSync = createHistory(req.originalUrl)
  const assets = webpackIsomorphicTools.assets()
  assets.styles.datePicker = '/DatePicker.css'
  assets.styles.fonts = '/fonts/fonts.css'

  const store = createStore(historyNotSync, { cookie }, {
    userAgent: req.headers['user-agent']
  })
  const history = syncHistoryWithStore(historyNotSync, store)
  function hydrateOnClient() {
    res.send(`<!doctype html>\n
             ${renderToString(<Html assets={assets} store={store} />)}`)
  }

  if (__DISABLE_SSR__) {
    console.log('render on client only')
    hydrateOnClient()
    return
  }

  const provide = () => ({ helpers: { cookie } })

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error))
      res.status(500)
      hydrateOnClient()
    } else if (renderProps) {
      loadOnServer({ ...renderProps, store, helpers: { cookie } })
        .then(() => {
          const status = renderProps.routes[renderProps.routes.length - 1].status || 200
          const component = (
            <Provider store={store} key='provider'>
              <ProviderTunnel provide={provide}>
                {() => <ReduxAsyncConnect {...renderProps} />}
              </ProviderTunnel>
            </Provider>
          )
          cookie.setRawCookie(req.headers.cookie)
          cookie.plugToRequest(req, res)
          const markup = renderToString(
            <Html
              assets={assets}
              component={component}
              store={store}
            />
          )

          res.status(status)
          res.send(`
            <!doctype html>
            ${markup}
          `)
        })
        .catch(data => {
          console.log(data)
          res.redirect('/server-error')
        })
    } else {
      res.status(404).send('Not found')
    }
  })
})

if (config.port) {
  server.listen(config.port, err => {
    if (err) {
      console.error(err)
    }
    console.log('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort)
    console.log('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}
