import { createAction, createReducer } from 'redux-act'
import R from 'ramda'
import storage from 'utils/storage'

const initialState = {
  isLoading: false,
  isLoaded: false
}

export const setTreeState = createAction('18ok/tree/SET_TREE_STATE')

const handleSetTreeState = (state, payload = []) => {
  const treeName = R.pathOr('', [0, 'name'], payload)
  const treeState = payload.reduce((acc, item) => {
    const { id, type, name, newState } = item
    const prevState = R.pathOr({}, [name, type, id], acc)
    const prevType = R.pathOr({}, [name, type], acc)

    return {
      ...acc,
      [name]: {
        ...acc[name],
        [type]: {
          ...prevType,
          [id]: {
            ...prevState,
            ...newState
          }
        }
      }
    }
  }, { ...state })

  if (treeName) {
    storage.set(treeName, treeState[treeName])
  }

  return treeState
}

const reducer = createReducer(on => {
  on(setTreeState, handleSetTreeState)
}, initialState)

export default reducer
