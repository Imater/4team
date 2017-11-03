import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import styles from './Repair.sss'

export default class Repair extends PureComponent {
  render() {
    return (
      <div className={styles('repairContainer')}>
        <Helmet title='Технические работы' />
        <div className={styles('repair')}>
          <span className={styles('version')}>2.102</span>
          <div className={styles('repairMessage')}>
            <h1 className={styles('h1')}>
              На сайте ведутся технические работы.
            </h1>
            <h2 className={styles('h2')}>
              В настоящее время наши программисты делают для вас сайт еще лучше!
            </h2>
          </div>
          <div className={styles('copyright')}>
            <span>4team, 2017</span>
          </div>
        </div>
      </div>
    )
  }
}
