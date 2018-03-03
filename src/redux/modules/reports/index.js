import { createAction, createReducer } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import axios from 'axios'
import R from 'ramda'
import moment from 'moment'
import config from 'config'

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

  const leftPad = str => `00${str}`.slice(-'00'.length)

  const days = R.compose(
    R.map(day => R.reverse(day)),
    R.map(R.sortBy(R.prop('end'))),
    R.map(day => R.map(task => {
      const time = moment.duration(task.dur)

      return {
        ...task,
        dur: `${leftPad(time.hours())}:${leftPad(time.minutes())}:${leftPad(time.seconds())}`
      }
    }, day)),
    R.map(day => R.values(day)),
    R.map(day => R.reduce((acc, cur) => ({
      ...acc,
      [cur.description]: {
        ...R.pick(['description', 'dur', 'end', 'id'], cur),
        dur: cur.dur + R.pathOr(0, [cur.description, 'dur'], acc)
      }
    }), {}, day)),
    R.groupBy(R.prop('date')),
    R.map(task => ({
      id: R.match(config.task.template, task.description)[0],
      date: task.end.split('T')[0],
      ...R.pick(['description', 'dur', 'end'], task)
    }))
  )(data)

  return {
    ...state,
    isLoading: false,
    isLoaded: true,
    days
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
