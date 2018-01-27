import { createAction, createReducer } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import { fetch as fetchUserData } from 'redux/modules/userData'

const initialState = {}

export const setToken = createAction('auth/SET_TOKEN')

const handleSetToken = (state, payload) =>
  loop(
    {
      ...state,
      token: payload.token
    },
    Effects.call(fetchUserData, payload.token)
  )

const reducer = createReducer(on => {
  on(setToken, handleSetToken)
}, initialState)

export default reducer
