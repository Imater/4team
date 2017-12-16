import React, { PureComponent } from 'react'
// import { string, number, bool, array, func, node } from 'prop-types'

import styles from './Tabs.styl'
import TabPinned from '../TabPinned/TabPinned'
import Tab from '../Tab/Tab'

export default class Tabs extends PureComponent {
  static propTypes = {

  }

  static defaultProps = {

  }

  render() {
    // const {  } = this.props

    return (
      <div className={styles.tabs}>
        <div className={styles.tabPinnedWrapper}>
          <div style={{ borderRight: '1px solid #000' }}>
            <TabPinned isActive color='#FFFFFF' backgroundColor='#FFEF09' icon='cloud' />
          </div>
          <div style={{ borderRight: '1px solid #000' }}>
            <TabPinned icon='heart' isDisabled />
          </div>
          <div style={{ borderRight: '1px solid #000' }}>
            <TabPinned color='#FFFFFF' backgroundColor='#FF00FE' icon='gift' isDisabled />
          </div>
          <div style={{ borderRight: '1px solid #000' }}>
            <TabPinned color='#FFFFFF' backgroundColor='#FF00FE'>
              A
            </TabPinned>
          </div>
          <TabPinned color='#FFFFFF' backgroundColor='#4443DC' icon='car' isDisabled />
        </div>
        <div className={styles.tabWrapper}>
          <div style={{width: '260px'}}>
            <Tab
              icon='truck'
              iconColor='#000000'
              iconBackgroundColor='#FFF000'
              activeColor='#FFF000'
              isWithCross
              isHideOnHover
            >
              Проверка СМС
            </Tab>
          </div>
          <div style={{width: '260px'}}>
            <Tab
              icon='circle'
              iconColor='black'
              iconBackgroundColor='orange'
              isActive
              activeColor='#FFFFFF'
              isWithCross
              isHideOnHover
            >
              Изначальная папка
            </Tab>
          </div>
        </div>
      </div>
    )
  }
}
