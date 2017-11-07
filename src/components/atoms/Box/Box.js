import React, { PureComponent } from 'react'
// import { string, number, bool, array, func, node } from 'prop-types'

import cx from './Box.sss'

export default class Box extends PureComponent {
  static propTypes = {

  }

  static defaultProps = {

  }

  render() {
    // const {  } = this.props

    return (
      <div className={cx('box')}>
        {this.props.children}
      </div>
    )
  }
}
