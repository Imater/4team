import { createAction, createReducer } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import { fetch as fetchUserData } from 'redux/modules/userData'

const initialState = {}

export const setToken = createAction('auth/SET_TOKEN')
export const setAuthSuccess = createAction('auth/SET_AUTH_SUCCESS')
export const setAuthFailure = createAction('auth/SET_AUTH_FAILURE')

const handleSetToken = (state, payload) =>
  loop(
    {
      ...state,
      token: payload.token
    },
    Effects.call(fetchUserData, payload.token)
  )

const handleSetAuthSuccess = state => ({
  ...state,
  isAuthorized: true
})

const handleSetAuthFailure = state => ({
  ...state,
  isAuthorized: false
})

const reducer = createReducer(on => {
  on(setToken, handleSetToken)
  on(setAuthSuccess, handleSetAuthSuccess)
  on(setAuthFailure, handleSetAuthFailure)
}, initialState)

export default reducer
