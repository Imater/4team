import { createAction, createReducer } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import axios from 'axios'

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

const handleFetchSuccess = (state, payload) => {

  return {
    ...state,
    isLoading: false,
    isLoaded: true,
    data: payload
  }
}

const handleFetchFailure = (state, payload) => ({
  ...state,
  isLoading: false,
  isLoaded: false
})

const reducer = createReducer(on => {
  on(fetch, handleFetch)
  on(fetchSuccess, handleFetchSuccess)
  on(fetchFailure, handleFetchFailure)
}, initialState)

export default reducer
