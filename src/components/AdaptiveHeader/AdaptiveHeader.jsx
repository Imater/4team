import React, { PureComponent, PropTypes } from 'react'
import containerQuery from 'decorators/containerQuery'
import R from 'ramda'
import cx from './AdaptiveHeader.sss'

class AdaptiveHeader extends PureComponent {
  static propTypes = {
    containerQuery: PropTypes.object
  }
  render() {
    return (
      <div>
        <div className={cx('adaptiveHeader', this.props.containerQuery)} >
          Feed me with components
        </div>
      </div>
    )
  }
}

export default R.compose(
  containerQuery(cx),
)(AdaptiveHeader)

