import { createAction, createReducer } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import axios from 'axios'
import R from 'ramda'

const initialState = {
  isLoading: false,
  isLoaded: false
}

export const fetch = createAction('projects/FETCH')
const fetchSuccess = createAction('projects/FETCH_SUCCESS')
const fetchFailure = createAction('projects/FETCH_FAILURE')

const request = ({ id, token }) =>
  axios.get(`/api/v8/workspaces/${id}/projects`, {
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
  const items = R.map(R.pick(['id', 'name']))(data)

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

const reducer = createReducer(on => {
  on(fetch, handleFetch)
  on(fetchSuccess, handleFetchSuccess)
  on(fetchFailure, handleFetchFailure)
}, initialState)

export default reducer
