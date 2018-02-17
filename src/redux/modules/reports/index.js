import { createAction, createReducer } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import axios from 'axios'
import R from 'ramda'

const initialState = {
  isLoading: false,
  isLoaded: false
}

export const fetch = createAction('reports/FETCH')
const fetchSuccess = createAction('reports/FETCH_SUCCESS')
const fetchFailure = createAction('reports/FETCH_FAILURE')

const request = ({ companyId, email, uid, token }) =>
  axios.get(`https://toggl.com/reports/api/v2/details?workspace_id=${companyId}&user_agent=${email}&user_ids=${uid}`, {
    auth: {
      username: token,
      password: 'api_token'
    }
  })
    .then(fetchSuccess)
    .catch(fetchFailure)

const handleFetch = (state, { companyId, email, uid, token }) =>
  loop(
    {
      ...state,
      isLoading: true,
      isLoaded: false
    },
    Effects.promise(request, { companyId, email, uid, token })
  )

const handleFetchSuccess = (state, payload) => {
  const data = R.path(['data'], payload)

  return {
    ...state,
    isLoading: false,
    isLoaded: true,
    data
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
