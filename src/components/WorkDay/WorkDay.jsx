import React, { PureComponent, PropTypes as pt } from 'react'
import { FormControl } from 'react-bootstrap'
import Title from 'components/Title'
import styles from './WorkDay.styl'

export default class WorkDay extends PureComponent {
  static propTypes = {
    caption: pt.string,
    children: pt.node
  }

  static defaultProps = {
    children: ''
  }

  render() {
    const { caption, children } = this.props

    return (
      <div className={styles.workDay}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Title level={2}>
              {caption}
            </Title>
          </div>

          {/* TODO: прикрутить redux-form */}
          <FormControl
            componentClass='textarea'
            rows={4}
            placeholder='textarea'
          />
        </div>

        {children}
      </div>
    )
  }
}
