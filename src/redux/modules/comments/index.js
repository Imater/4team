import { createAction, createReducer } from 'redux-act'
import storage from 'utils/storage'
import R from 'ramda'

const initialState = {}

export const loadComments = createAction('comments/LOAD_COMMENTS')
export const saveComments = createAction('comments/SAVE_COMMENTS')

const handleLoadComments = (state, payload) => {
  const days = storage.get('comments', {})

  return {
    ...state,
    user: payload,
    days
  }
}

const handleSaveComments = (state, payload) => {
  const days = storage.get('comments', {})
  const user = R.prop('user', state)

  storage.set('comments', {
    ...days,
    [user]: payload
  })

  return {
    ...state,
    [user]: payload
  }
}

const reducer = createReducer(on => {
  on(loadComments, handleLoadComments)
  on(saveComments, handleSaveComments)
}, initialState)

export default reducer
