import { createAction, createReducer } from 'redux-act'
import storage from 'utils/storage'

const initialState = {}

export const saveDayComment = createAction('workday/SAVE_DAY_COMMENT')

const handleSaveDayComment = (state, payload) => {
  storage.set('comments', payload)

  return {
    ...state,
    comments: payload
  }
}

const reducer = createReducer(on => {
  on(saveDayComment, handleSaveDayComment)
}, initialState)

export default reducer
