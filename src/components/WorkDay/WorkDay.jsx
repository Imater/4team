import React, { PureComponent, PropTypes as pt } from 'react'
import { Field } from 'redux-form'
import { FormControl } from 'react-bootstrap'
import Title from 'components/Title'
import styles from './WorkDay.styl'

export default class WorkDay extends PureComponent {
  static propTypes = {
    user: pt.string,
    caption: pt.string,
    children: pt.node,
    onBlur: pt.func
  }

  static defaultProps = {
    onBlur: () => {}
  }

  renderField = ({ input: { value, onChange } }) => (
    <FormControl
      componentClass='textarea'
      rows={4}
      placeholder='Введите заметку'
      value={value}
      onChange={onChange}
      onBlur={this.props.onBlur}
    />
  )

  render() {
    const {
      caption,
      children
    } = this.props

    return (
      <div className={styles.workDay}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Title level={2}>
              {caption}
            </Title>
          </div>

          <Field
            name={caption}
            component={this.renderField}
          />
        </div>

        {children}
      </div>
    )
  }
}
