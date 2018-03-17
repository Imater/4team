import { createAction, createReducer } from 'redux-act'

const initialState = {}

export const saveDayComment = createAction('workday/SAVE_DAY_COMMENT')

const handleSaveDayComment = (state, payload) => ({
  ...state,
  comment: payload
})

const reducer = createReducer(on => {
  on(saveDayComment, handleSaveDayComment)
}, initialState)

export default reducer
