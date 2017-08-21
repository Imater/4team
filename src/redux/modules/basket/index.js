import { createAction, createReducer } from 'redux-act'
import R from 'ramda'

export const setCount = createAction('4team/basket/SET_COUNT')
export {
  getIsLoaded,
  getIsLoading
} from './selector'

const initialState = {
  itemsCount: 0,
  itemsSum: 0
}

const handleSetCount = (state, payload) => ({
  ...state,
  isLoaded: true,
  itemsCount: parseInt(R.pathOr(0, ['data', 'response', 'CNT'], payload), 10),
  itemsSum: R.pathOr(0, ['data', 'response', 'SUM'], payload)
})


const reducer = createReducer(on => {
  on(setCount, handleSetCount)
}, initialState)

export default reducer
