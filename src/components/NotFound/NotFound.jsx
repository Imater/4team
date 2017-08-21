import React from 'react'

import styles from './NotFound.styl'
import zero from './zero.png'

export default function NotFound() {
  return (
    <div>
      <div className={styles.digit}>
        4
        <img
          src={zero}
          className={styles.zero}
          role='presentation'
        />
        4
      </div>
      <div className={styles.text}>
        Страница которую вы запрашиваете не найдена, попробуйте воспользоваться нашим
        поиском или перейти в интересующий вас <a href='/catalog-list/' className={styles.link}>раздел каталога</a>

        <div>
          <a href='/catalog-list/' className={styles.button}>В каталог</a>
        </div>
      </div>
    </div>
  )
}
