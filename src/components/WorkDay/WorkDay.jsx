import React, { PureComponent, PropTypes as pt } from 'react'
import { Field } from 'redux-form'
import R from 'ramda'
import TextareaAutosize from 'react-autosize-textarea'
import Title from 'components/Title'
import Text from 'components/Text'

import styles from './WorkDay.styl'


export default class WorkDay extends PureComponent {
  static propTypes = {
    caption: pt.string,
    time: pt.string,
    children: pt.node,
    onBlur: pt.func
  }

  static defaultProps = {
    onBlur: () => {}
  }

  renderField = ({ input: { value, onChange } }) => (
    <TextareaAutosize
      className={styles.textarea}
      placeholder='Введите заметку'
      value={value}
      onChange={onChange}
      onBlur={this.props.onBlur}
    />
  )

  render() {
    const {
      caption,
      time,
      children
    } = this.props
    const date = R.replace(/\./g, '', caption).split(' ')[0]
    const fieldName = `date-${date}`

    return (
      <div className={styles.workDay}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Title level={2}>
              {caption}
            </Title>

            <div className={styles.time}>
              <Text size={16}>
                {time}
              </Text>
            </div>
          </div>

          <Field
            name={fieldName}
            component={this.renderField}
          />
        </div>

        {children}
      </div>
    )
  }
}
