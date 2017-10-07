import React, { PureComponent } from 'react'
import containerQuery from 'decorators/containerQuery'
import R from 'ramda'
import cx from './AdaptiveHeader.sss'

class AdaptiveHeader extends PureComponent {
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

