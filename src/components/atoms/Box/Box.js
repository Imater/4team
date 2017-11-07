import React, { PureComponent } from 'react'
import { node } from 'prop-types'

import cx from './Box.sss'

export default class Box extends PureComponent {
  propTypes = {
    children: node
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
