import React, { PureComponent, PropTypes as pt } from 'react'
import { Field } from 'redux-form'
import cn from 'classnames'

import styles from './Auth.styl'

export default class Auth extends PureComponent {
  static propTypes = {
    isAuthorized: pt.bool,
    submitSucceeded: pt.bool,
    handleSubmit: pt.func.isRequired
  }

  static defaultProps = {
    handleSubmit: () => {}
  }

  renderInput = field => {
    const { isAuthorized, submitSucceeded } = this.props
    const { type, placeholder, input } = field
    const isError = !isAuthorized && submitSucceeded

    return (
      <input
        className={cn(styles.input, {
          [styles.input_error]: isError
        })}
        type={type}
        placeholder={placeholder}
        {...input}
      />
    )
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form
        className={styles.auth}
        onSubmit={handleSubmit}
      >
        <Field
          name='token'
          type='text'
          placeholder='API token'
          component={this.renderInput}
        />

        <button className={styles.submit} />
      </form>
    )
  }
}
