import React, { Component } from 'react'
import TextFieldGroup from './TextFieldGroup'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../actions/auth'
import '../styles/_onboarding.styl'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.formChange = this.formChange.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }

  componentDidMount () {
    const { isAuthed } = this.props.auth

    if (isAuthed) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps (nextProps) {
    const { isAuthed } = nextProps.auth
    const { errors } = nextProps

    if (isAuthed) {
      this.props.history.push('/dashboard')
    }

    if (errors) {
      this.setState({ errors })
    }
  }

  formChange (event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  formSubmit (event) {
    event.preventDefault()

    const { email, password } = this.state
    const user = {
      email,
      password
    }

    this.props.loginUser(user)
  }
  render () {
    const { errors, email, password } = this.state
    return (
      <div className="onboarding">
        <div className="onboarding-info">
          <h2>Sign In</h2>
          <form onSubmit={this.formSubmit}>
            <TextFieldGroup
              placeholder="Email"
              name="email"
              type="email"
              value={email}
              onChange={this.formChange}
              error={errors.email}
            />
            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={this.formChange}
              error={errors.password}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)
