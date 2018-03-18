import React, { PureComponent, PropTypes as pt } from 'react'
import { Field } from 'redux-form'
import { FormControl } from 'react-bootstrap'
import Title from 'components/Title'
import styles from './WorkDay.styl'

export default class WorkDay extends PureComponent {
  static propTypes = {
    caption: pt.string,
    children: pt.node,
    handleSubmit: pt.func
  }

  static defaultProps = {
    handleSubmit: () => {}
  }

  renderField = ({ input: { value, onChange }, ...rest }) => (
    <FormControl
      componentClass='textarea'
      value={value}
      onChange={onChange}
      onBlur={this.props.handleSubmit}
      {...rest}
    />
  )

  render() {
    const {
      caption,
      children,
      handleSubmit
    } = this.props

    return (
      <div className={styles.workDay}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Title level={2}>
              {caption}
            </Title>
          </div>

          <form onSubmit={handleSubmit}>
            <Field
              name={caption}
              rows={4}
              placeholder='Введите заметку'
              component={this.renderField}
            />
          </form>
        </div>

        {children}
      </div>
    )
  }
}
