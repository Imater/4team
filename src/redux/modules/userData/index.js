import { createAction, createReducer } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import axios from 'axios'
import R from 'ramda'
import { setAuthSuccess, setAuthFailure } from 'redux/modules/auth'
import { fetch as fetchUsers } from 'redux/modules/users'

const initialState = {
  isLoading: false,
  isLoaded: false
}

export const fetch = createAction('userData/FETCH')
const fetchSuccess = createAction('userData/FETCH_SUCCESS')
const fetchFailure = createAction('userData/FETCH_FAILURE')

const request = payload =>
  axios.get('https://www.toggl.com/api/v8/me', {
    auth: {
      username: payload,
      password: 'api_token'
    }
  })
    .then(data => fetchSuccess({ data, token: payload }))
    .catch(fetchFailure)

const handleFetch = (state, payload) =>
  loop(
    {
      ...state,
      isLoading: true,
      isLoaded: false
    },
    Effects.promise(request, payload)
  )

const handleFetchSuccess = (state, { data, token }) => {
  const companyId = R.path(['data', 'data', 'default_wid'], data)

  return loop(
    {
      ...state,
      isLoading: false,
      isLoaded: true,
      companyId,
      email: R.path(['data', 'data', 'email'], data),
      error: ''
    },
    Effects.batch([
      Effects.call(setAuthSuccess),
      Effects.call(fetchUsers, { id: companyId, token })
    ])
  )
}

const handleFetchFailure = (state, payload) =>
  loop(
    {
      ...state,
      isLoading: false,
      isLoaded: false,
      error: payload.message
    },
    Effects.call(setAuthFailure)
  )

const reducer = createReducer(on => {
  on(fetch, handleFetch)
  on(fetchSuccess, handleFetchSuccess)
  on(fetchFailure, handleFetchFailure)
}, initialState)

export default reducer
