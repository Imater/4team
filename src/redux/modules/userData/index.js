import { createAction, createReducer } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import axios from 'axios'
import R from 'ramda'
import { setAuthSuccess, setAuthFailure } from 'redux/modules/auth'

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
    .then(fetchSuccess)
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

const handleFetchSuccess = (state, payload) =>
  loop(
    {
      ...state,
      isLoading: false,
      isLoaded: true,
      companyId: R.path(['data', 'data', 'default_wid'], payload),
      email: R.path(['data', 'data', 'email'], payload),
      error: ''
    },
    Effects.call(setAuthSuccess)
  )

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
