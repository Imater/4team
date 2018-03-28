import { createAction, createReducer } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import axios from 'axios'
import R from 'ramda'
import { getDays } from './selector'

const initialState = {
  isLoading: false,
  isLoaded: false
}

export const fetch = createAction('reports/FETCH')
const fetchSuccess = createAction('reports/FETCH_SUCCESS')
const fetchFailure = createAction('reports/FETCH_FAILURE')

const request = ({ companyId, email, uid, since, until, token, page }) =>
  axios.get('/reports/api/v2/details', {
    auth: {
      username: token,
      password: 'api_token'
    },
    params: {
      workspace_id: companyId,
      user_agent: email,
      user_ids: uid,
      order_field: 'date',
      since,
      until,
      page
    }
  })
    .then(response => fetchSuccess({ response, page }))
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

const handleFetchSuccess = (state, { response, page }) => {
  const data = R.path(['data', 'data'], response)
  const oldData = page === 1 || state.data === undefined ? [] : state.data
  const newData = data.concat(oldData)
  const days = getDays(newData)

  return {
    ...state,
    isLoading: false,
    isLoaded: true,
    data: newData,
    days,
    page
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
