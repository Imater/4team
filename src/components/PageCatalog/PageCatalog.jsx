import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import containerQuery from 'decorators/containerQuery'
import R from 'ramda'
import cx from './PageCatalog.sss'

class PageCatalog extends PureComponent {
  propTypes = {
    containerQuery: PropTypes.shape({})
  }
  render() {
    return (
      <div className={cx('pageCatalog')}>
        <div className={cx('zzzz', this.props.containerQuery)} >
          Feed me with components
        </div>
      </div>
    )
  }
}

export default R.compose(
  containerQuery(cx),
)(PageCatalog)

