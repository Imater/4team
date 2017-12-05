import React, { PureComponent } from 'react'
import { array, string, func } from 'prop-types'
import cx from 'classnames'
import FontAwesomeSymbol from 'react-fontawesome'
import R from 'ramda'

import styles from './IconTabs.sss'

export default class IconTabs extends PureComponent {
  static propTypes = {
    items: array,
    value: string,
    onChange: func
  }

  static defaultProps = {
    items: [],
    value: 'decor',
    onChange: () => { }
  }

  handleClick = name => () => {
    this.props.onChange(name)
  }

  renderIcon = item => (
    <button
      className={cx(styles.iconTabsItem, {
        [styles.iconTabsItem_active]: this.props.value === R.prop('name', item)
      })}
      type='button'
      name={R.prop('name', item)}
      key={R.prop('id', item)}
      onClick={this.handleClick(R.prop('name', item))}
    >
      <FontAwesomeSymbol name={R.prop('iconName', item)} className={styles.iconTabsIcon} />
      <p className={styles.iconTabsTitle}>{R.prop('title', item)}</p>
    </button>
  )

  render() {
    const { items } = this.props

    return (
      <div className={styles.iconTabs}>
        {items.map(this.renderIcon)}
      </div>
    )
  }
}
