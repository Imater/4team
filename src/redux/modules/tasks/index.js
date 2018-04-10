import { createAction, createReducer } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import axios from 'axios'
import R from 'ramda'
import moment from 'moment/moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)

const initialState = {
  isLoading: false,
  isLoaded: false
}

export const setActiveTask = createAction('tasks/SET_ACTIVE_TASK')
export const fetch = createAction('tasks/FETCH')
const fetchSuccess = createAction('tasks/FETCH_SUCCESS')
const fetchFailure = createAction('tasks/FETCH_FAILURE')

const handleSetActiveTask = (state, payload) => ({
  ...state,
  activeTask: payload
})

const request = ({ token, companyId, email, description }) =>
  axios.get('/reports/api/v2/summary', {
    auth: {
      username: token,
      password: 'api_token'
    },
    params: {
      workspace_id: companyId,
      user_agent: email,
      description,
      since: moment(new Date()).subtract(365, 'days').format('YYYY-MM-DD'),
      until: moment(new Date()).format('YYYY-MM-DD'),
      grouping: 'projects',
      subgrouping: 'time_entries',
      order_field: 'title',
      order_desc: 'off',
      rounding: 'Off',
      distinct_rates: 'Off',
      status: 'active',
      billable: 'both',
      calculate: 'time',
      sortDirection: 'asc',
      sortBy: 'title',
      page: 1,
      with_total_currencies: 1,
      bars_count: 31,
      subgrouping_ids: true,
      date_format: 'DD-MM-YYYY'
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
  const data = R.head(R.path(['data', 'data'], payload))
  const taskTime = moment.duration(data.time, 'milliseconds').format('h[ч] mm[м]')

  return {
    ...state,
    isLoading: false,
    isLoaded: true,
    taskTime
  }
}

const handleFetchFailure = (state, payload) => ({
  ...state,
  isLoading: false,
  isLoaded: false,
  error: payload.message
})

const reducer = createReducer(on => {
  on(setActiveTask, handleSetActiveTask)
  on(fetch, handleFetch)
  on(fetchSuccess, handleFetchSuccess)
  on(fetchFailure, handleFetchFailure)
}, initialState)

export default reducer
