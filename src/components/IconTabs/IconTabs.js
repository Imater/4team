import React, { PureComponent } from 'react'
import { array } from 'prop-types'
import cx from 'classnames'
import FontAwesomeSymbol from 'react-fontawesome'
import R from 'ramda'

import styles from './IconTabs.sss'

export default class IconTabs extends PureComponent {
  static propTypes = {
    items: array
  }

  static defaultProps = {
    items: []
  }

  state = {
    value: 'decor'
  }

  handleClick = name => () => {
    this.setState({
      value: name
    })
  }

  renderIcon = item => (
    <button
      className={cx(styles.iconTabsItem, {
        [styles.iconTabsItem_active]: this.state.value === R.prop('name', item)
      })}
      type='button'
      name={R.prop('name', item)}
      onClick={this.handleClick(R.prop('name', item))}
      key={R.prop('id', item)}
    >
      <FontAwesomeSymbol name={R.prop('iconName', item)} className={styles.iconTabsIcon} />
      <p className={styles.iconTabsTitle}>{R.prop('title', item)}</p>
    </button>
  )

  render() {
    const { items } = this.props

    return (
      <div className={styles.iconTabs}>
        <input
          className={styles.iconTabsInput}
          type='text'
          defaultValue={this.state.value}
        />
        {items.map(this.renderIcon)}
      </div>
    )
  }
}
