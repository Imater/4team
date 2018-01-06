import React, { PureComponent, PropTypes as pt } from 'react'
import { FormControl } from 'react-bootstrap'
import Title from 'components/Title'
import Text from 'components/Text'
import styles from './WorkDay.styl'

export default class WorkDay extends PureComponent {
  static propTypes = {
    day: pt.object,
    children: pt.node
  }

  static defaultProps = {
    day: {},
    children: ''
  }

  renderHeader({ name, time }) {
    return (
      <div className={styles.header}>
        <Title level={2}>
          {name}
        </Title>

        <Text size={18}>
          {time}
        </Text>
      </div>
    )
  }

  render() {
    const { day, children } = this.props

    return (
      <div className={styles.workDay}>
        <div className={styles.wrapper}>
          {this.renderHeader(day)}

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
