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

const request = ({ companyId, email, uid, since, until, token }) =>
  axios.get('https://toggl.com/reports/api/v2/details', {
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
      until
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
  const data = R.path(['data', 'data'], payload)
  const filteredData = R.map(R.pick(['description', 'dur', 'end']))(data)
  const modifiedData = R.map(task => ({
    ...task,
    end: task.end.split('T')[0]
  }))(filteredData)
  // const tasks = R.reduce((acc, cur) => {
  //   const isSaved = R.contains({ description: cur.description }, acc)
  //
  //   if (isSaved) {
  //     acc[cur]
  //   }
  // }, [])(modifiedData)

  return {
    ...state,
    isLoading: false,
    isLoaded: true,
    tasks: modifiedData
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
