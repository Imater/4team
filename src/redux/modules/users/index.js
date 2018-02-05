import { createAction, createReducer } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import axios from 'axios'
import R from 'ramda'
import config from 'config'

const initialState = {
  isLoading: false,
  isLoaded: false
}

export const fetch = createAction('users/FETCH')
const fetchSuccess = createAction('users/FETCH_SUCCESS')
const fetchFailure = createAction('users/FETCH_FAILURE')

const request = ({ id, token }) =>
  axios.get(`https://www.toggl.com/api/v8/workspaces/${id}/workspace_users`, {
    auth: {
      username: token,
      password: 'api_token'
    }
  })
    .then(fetchSuccess)
    .catch(fetchFailure)

const handleFetch = (state, { id, token }) =>
  loop(
    {
      ...state,
      isLoading: true,
      isLoaded: false
    },
    Effects.promise(request, { id, token })
  )

const handleFetchSuccess = (state, payload) => {
  const data = R.path(['data'], payload)
  const configUsers = config.users.reduce((acc, item) =>
    [].concat(acc, item.email), [])
  const filteredData = R.filter(user =>
    R.contains(user.email, configUsers))(data)
  const filteredUsers = R.map(R.pick(['id', 'name', 'email']))(filteredData)
  const users = filteredUsers.map(user => ({
    ...user,
    name: user.name.split(' ')[0]
  }))

  return {
    ...state,
    isLoading: false,
    isLoaded: true,
    users,
    error: ''
  }
}

const handleFetchFailure = (state, payload) => ({
  ...state,
  isLoading: false,
  isLoaded: false,
  error: payload.message
})

const reducer = createReducer(on => {
  on(fetch, handleFetch)
  on(fetchSuccess, handleFetchSuccess)
  on(fetchFailure, handleFetchFailure)
}, initialState)

export default reducer
