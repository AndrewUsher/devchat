import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../actions/auth'

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
      <div className="login">
        <div className="container">
          <p>Sign in to Devchat</p>
          <form onSubmit={this.formSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={email} onChange={this.formChange} />
              {errors.email && (
                <div className="form-invalid">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={this.formChange} />
              {errors.password && (
                <div className="form-invalid">{errors.password}</div>
              )}
            </div>
            <input type="submit" value="Login" />
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
