import React, { Component, PropTypes as pt } from 'react'
import pureRender from 'pure-render-decorator'
import R from 'ramda'
import styles from './Tree.sss'

@pureRender
export default class Tree extends Component {
  static propTypes = {
    name: pt.string,
    itemsByParentId: pt.object,
    stateById: pt.object,
    renderRow: pt.func,
    setTreeState: pt.func,
    isBrothersClose: pt.bool
  }

  static defaultProps = {
    itemsByParentId: {},
    stateById: {},
    renderRow: () => {},
    setTreeState: () => {}
  }

  closeChildren = ({ name, type, parentId }) => {
    const { itemsByParentId } = this.props
    const children = R.pathOr([], [type, parentId], itemsByParentId)
    const newTreeSate = []

    children.forEach(child => {
      newTreeSate.push({
        name,
        type,
        id: child.id,
        newState: {
          expanded: false
        }
      })
    })

    return newTreeSate
  }

  renderItem({ id, type, parentId }) {
    const {
      stateById,
      setTreeState,
      name,
      renderRow,
      isBrothersClose
    } = this.props
    const state = R.pathOr({}, [type, id], stateById)
    const isRenderChilds = id === -1 || state.expanded
    const setState = newState => {
      let newTreeSate = []

      // close all brothers
      if (isBrothersClose && newState.expanded) {
        const brothersStateArray = this.closeChildren({
          name,
          type,
          parentId
        })

        newTreeSate = [
          ...brothersStateArray
        ]
      }

      // close all children
      if (!newState.expanded) {
        const childrenStateArray = this.closeChildren({
          name,
          type,
          parentId: id
        })

        newTreeSate = [
          ...childrenStateArray
        ]
      }

      setTreeState([
        ...newTreeSate,
        {
          name,
          type,
          id,
          newState
        }
      ])
    }

    return (
      <li
        key={id}
        className={styles.item}
      >
        {renderRow({ id, type, state, setState, parentId })}

        {isRenderChilds && this.renderList({ id, type })}
      </li>
    )
  }

  renderList({ id, type }) {
    const { itemsByParentId } = this.props
    const list = R.pathOr([], [type, id], itemsByParentId)
    const listWithParentId = list.map(item => ({
      ...item,
      parentId: id
    }))

    if (listWithParentId.length === 0) {
      return null
    }

    return (
      <ul className={styles.list}>
        {listWithParentId.map(this.renderItem, this)}
      </ul>
    )
  }

  render() {
    const id = -1
    const type = 'assortmentType'

    return (
      <div className={styles.tree}>
        {this.renderList({ id, type })}
      </div>
    )
  }
}
