import R from 'ramda'
import { connect } from 'react-redux'
import preventRenderWhileLoading from 'utils/decorators/preventRenderWhileLoading'
import { createSelector } from 'reselect'
import storage from 'utils/storage'
import { setTreeState } from 'redux/modules/tree'
import Tree from '../../components/molecules/Tree'

const getTreeState = createSelector(
  R.prop('tree'),
  (state, props) => R.prop('name', props),
  (tree, name) => tree[name] ? tree[name] : storage.get(name)
)

export default R.compose(
  preventRenderWhileLoading(),
  connect(
    (state, ownProps) => ({
      stateById: getTreeState(state, ownProps)
    }), {
      setTreeState
    }
  )
)(Tree)
