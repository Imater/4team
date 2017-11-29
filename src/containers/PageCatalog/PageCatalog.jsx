import React, { PureComponent } from 'react'
import Box from 'components/atoms/Box'
import AdaptiveHeader from 'components/AdaptiveHeader'

const itemsByParentId = {
  '-1': [
    {
      id: '2'
    }
  ],
  2: [
    {
      id: '3'
    }
  ],
  3: [
    {
      id: '4'
    }, {
      id: '5'
    }
  ]
}
export default class PageCatalog extends PureComponent {
  renderRow = ({ id, type, state, setState, parentId }) => {
    return <div>{id}</div>
  }
  render() {
    return (
      <div>
        <AdaptiveHeader />
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>9</Box>
        <Tree
            name='extraCharge'
            itemsByParentId={itemsByParentId}
            renderRow={this.renderRow}
            isBrothersClose
          />
      </div>
    )
  }
}
