import { combineReducers } from 'redux-loop'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-async-connect'
import { reducer as form } from 'redux-form'
import basket from './basket'
import userAgent from './userAgent'

const appReducers = combineReducers({
  basket,
  form,
  reduxAsyncConnect,
  routing: routerReducer,
  userAgent
})

export default appReducers
