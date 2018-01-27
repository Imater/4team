import React, { PureComponent, PropTypes as pt } from 'react'
import { Field } from 'redux-form'
import styles from './Auth.styl'

export default class Auth extends PureComponent {
  static propTypes = {
    handleSubmit: pt.func.isRequired
  }

  static defaultProps = {
    handleSubmit: () => {}
  }

  renderInput = field => {
    const { type, placeholder, input } = field

    return (
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        {...input}
      />
    )
  }

  render() {
    const {
      handleSubmit
    } = this.props

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

        <button type='hidden' />
      </form>
    )
  }
}
