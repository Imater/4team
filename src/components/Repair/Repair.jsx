import React from 'react'
import Helmet from 'react-helmet'
import WaitRepair from 'components/WaitRepair'
import styles from './Repair.styl'

export default () => (
  <div className={styles.repairContainer}>
    <Helmet title='Технические работы' />
    <div className={styles.repair}>
      <WaitRepair />
      <img
        className={styles.cogwheel}
        width='39'
        height='35'
        role='presentation'
        src='/Technical/cogwheel.png'
      />
      <img
        className={styles.screw}
        width='25'
        height='25'
        role='presentation'
        src='/Technical/screw.png'
      />
      <span className={styles.version}>2.102</span>
      <div className={styles.repairMessage}>
        <h1 className={styles.h1}>
          На сайте ведутся технические работы
        </h1>
        <h2 className={styles.h2}>
          В настоящее время наши программисты делают для вас сайт еще лучше!
        </h2>
      </div>
      <div className={styles.copyright}>
        <span>4team, 2017</span>
      </div>
    </div>
  </div>
)
