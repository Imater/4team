import { createAction, createReducer } from 'redux-act'

const initialState = {}

export const setActiveTask = createAction('tasks/SET_ACTIVE_TASK')

const handleSetActiveTask = (state, payload) => ({
  ...state,
  activeTask: payload
})

const reducer = createReducer(on => {
  on(setActiveTask, handleSetActiveTask)
}, initialState)

export default reducer
