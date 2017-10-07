import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import containerQuery from 'decorators/containerQuery'
import R from 'ramda'
import cx from './NotFound.sss'
import zero from './zero.png'

@pureRender
class NotFound extends Component {
  render() {
    return (
      <div>
        <div className={cx('digit')}>
          4
          <img
            src={zero}
            className={cx('zero')}
            role='presentation'
          />
          4
        </div>
        <div className={cx('text')}>
          Страница которую вы запрашиваете не найдена, попробуйте воспользоваться нашим
          поиском или перейти в интересующий вас <a href='/catalog-list/' className={cx('link')}>раздел каталога</a>

          <div>
            <a href='/catalog-list/' className={cx('button')}>В каталог</a>
          </div>
        </div>
      </div>
    )
  }
}

export default R.compose(
  containerQuery(cx),
)(NotFound)
