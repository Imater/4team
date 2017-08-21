import createLogger from 'react-render-logger'

const enableChecker =
  componentKey =>
    componentKey

const renderLogger = createLogger(enableChecker)

export default renderLogger
