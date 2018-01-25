import { createAction, createReducer } from 'redux-act'

export const sendToken = createAction('4team/basket/SEND_TOKEN')

const initialState = {
  isLoading: false,
  isLoaded: false
}

const handleSendToken = (state, payload) => ({
  ...state,
  isLoading: true
})

const reducer = createReducer(on => {
  on(sendToken, handleSendToken)
}, initialState)

export default reducer
