require('babel-polyfill') // eslint-disable-line import/no-require

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development']

export default Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 3031,
  apiServer: process.env.APISERVER || 'http://s.api.4team.ru:80',
  authServer: process.env.AUTHSERVER || 'http://s.connect.4team.ru/',
  kladrToken: process.env.KLADR_TOKEN || '57d649510a69de06468b45cb',
  metrika: {
    status: true,
    ga: 'UA-79219887-1',
    ym: 37948040
  },
  apiAuth: {
    client_id: 'node_thing',
    client_secret: 'e4c25cec64c71d10001ae4c768fb9fc76c5193be'
  },
  fbAppId: '943302642385993',
  loyaltyOrderMaxLimit: 10000,
  serverSideFiltration: false,
  app: {
    title: '4team',
    description: 'Big tasks store',
    head: {
      titleTemplate: '%s - 4team',
      meta: [
        { name: 'description', content: 'Big distribution store' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: '4team' },
        { property: 'og:image', content: 'http://4team.ru/images/logo.png' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:title', content: 'Relef' },
        { property: 'og:description', content: 'Big distribution store' },
        { property: 'og:card', content: 'Gaze from your telescope' },
        { property: 'og:site', content: '@CSSSR' },
        { property: 'og:creator', content: '@CSSSR' },
        { property: 'og:image:width', content: '104' },
        { property: 'og:image:height', content: '41' }
      ]
    }
  }
}, environment)
