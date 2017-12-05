import React, { PureComponent } from 'react'
import Box from 'components/atoms/Box'
import AdaptiveHeader from 'components/AdaptiveHeader'

export default class PageCatalog extends PureComponent {
  render() {
    return (
      <div>
        <AdaptiveHeader />
        <Box name={'circle'} />
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>9</Box>
      </div>
    )
  }
}
