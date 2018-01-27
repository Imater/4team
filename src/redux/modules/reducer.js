import { combineReducers } from 'redux-loop'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-async-connect'
import { reducer as form } from 'redux-form'
import userAgent from './userAgent'
import auth from './auth'
import userData from './userData'

const appReducers = combineReducers({
  form,
  reduxAsyncConnect,
  routing: routerReducer,
  userAgent,
  auth,
  userData
})

export default appReducers
