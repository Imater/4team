import { createAction, createReducer } from 'redux-act'
import R from 'ramda'

export const set = createAction('4TEAM/PANEL/SET')

const panelSmallLeft = {
  name: 'boxLeft',
  type: 'side',
  size: 'mini'
}
const panelTree = {
  name: 'treeLeft',
  type: 'tree',
  size: 'max'
}
const panelEditor = {
  name: 'editorRight',
  type: 'editor',
  size: 'max'
}
const panelSmallRight = {
  name: 'box1',
  type: 'side',
  size: 'mini'
}

const initialState = {
  panels: [
    panelSmallLeft,
    panelTree,
    panelEditor,
    panelSmallRight
  ]
}

const handleSet = (state, { index, value }) => ({
  ...state,
  panels: R.update(index, value, state.panels)
})


const reducer = createReducer(on => {
  on(set, handleSet)
}, initialState)

export default reducer

export const getPanels = R.prop('panels')
