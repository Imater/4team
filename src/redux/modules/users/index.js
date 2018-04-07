import { createAction, createReducer } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import axios from 'axios'
import R from 'ramda'

const initialState = {
  isLoading: false,
  isLoaded: false,
  isProjectUsersLoading: false,
  isProjectUsersLoaded: false
}

export const fetch = createAction('users/FETCH')
const fetchSuccess = createAction('users/FETCH_SUCCESS')
const fetchFailure = createAction('users/FETCH_FAILURE')

export const fetchProjectUsers = createAction('users/FETCH_PROJECT_USERS')
const fetchProjectUsersSuccess = createAction('users/FETCH_PROJECT_USERS_SUCCESS')
const fetchProjectUsersFailure = createAction('users/FETCH_PROJECT_USERS_FAILURE')

const request = ({ id, token }) =>
  axios.get(`/api/v8/workspaces/${id}/workspace_users`, {
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
  const data = R.prop('data', payload)
  const filteredFields =
    R.map(R.pick(['id', 'name', 'email', 'uid']))(data)
  const items = filteredFields.map(user => ({
    ...user,
    name: user.name.split(' ')[0]
  }))

  return {
    ...state,
    isLoading: false,
    isLoaded: true,
    items,
    error: ''
  }
}

const handleFetchFailure = (state, payload) => ({
  ...state,
  isLoading: false,
  isLoaded: false,
  error: payload.message
})


const requestProjectUsers = ({ id, token }) =>
  axios.get(`/api/v8/projects/${id}/project_users`, {
    auth: {
      username: token,
      password: 'api_token'
    }
  })
    .then(fetchProjectUsersSuccess)
    .catch(fetchProjectUsersFailure)

const handleFetchProjectUsers = (state, { id, token }) =>
  loop(
    {
      ...state,
      isProjectUsersLoading: true,
      isProjectUsersLoaded: false
    },
    Effects.promise(requestProjectUsers, { id, token })
  )

const handleFetchProjectUsersSuccess = (state, payload) => {
  const data = R.pathOr([], ['data'], payload)
  const uids = R.map(user => user.uid)(data)
  const users = state.items.filter(user => R.contains(user.uid, uids))
  const sortedUsers = R.sortBy(R.prop('name'))(users)

  return {
    ...state,
    isProjectUsersLoading: false,
    isProjectUsersLoaded: true,
    users: sortedUsers,
    error: ''
  }
}

const handleFetchProjectUsersFailure = (state, payload) => ({
  ...state,
  isProjectUsersLoading: false,
  isProjectUsersLoaded: false,
  error: payload.message
})

const reducer = createReducer(on => {
  on(fetch, handleFetch)
  on(fetchSuccess, handleFetchSuccess)
  on(fetchFailure, handleFetchFailure)
  on(fetchProjectUsers, handleFetchProjectUsers)
  on(fetchProjectUsersSuccess, handleFetchProjectUsersSuccess)
  on(fetchProjectUsersFailure, handleFetchProjectUsersFailure)
}, initialState)

export default reducer
