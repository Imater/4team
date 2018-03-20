import { combineReducers } from 'redux-loop'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-async-connect'
import { reducer as form } from 'redux-form'
import userAgent from './userAgent'
import auth from './auth'
import userData from './userData'
import users from './users'
import reports from './reports'
import tasks from './tasks'
import comments from './comments'

const appReducers = combineReducers({
  form,
  reduxAsyncConnect,
  routing: routerReducer,
  userAgent,
  auth,
  userData,
  users,
  reports,
  tasks,
  comments
})

export default appReducers
