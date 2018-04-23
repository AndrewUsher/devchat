import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../actions/auth'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
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

    const { history } = this.props
    const { name, email, password, password2 } = this.state
    const user = {
      name,
      email,
      password,
      password2
    }

    this.props.registerUser(user, history)
  }

  render () {
    const { errors } = this.state
    const { name, email, password, password2 } = this.state

    return (
      <div className="register">
        <div className="container">
          <h2>Sign Up</h2>
          <p>
            Create a new account
          </p>
          <form onSubmit={this.formSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={this.formChange}
              />
              {errors.name && (
                <div className="form-invalid">{errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={this.formChange}
              />
              {errors.email && (
                <div className="form-invalid">{errors.email}</div>
              )}
              <small>
                This site uses Gravatar so if you want a profile image, use
                a Gravatar email
              </small>
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.formChange}
              />
              {errors.password && (
                <div className="form-invalid">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={this.formChange}
              />
              {errors.password2 && (
                <div className="form-invalid">{errors.password2}</div>
              )}
            </div>
            <input type="submit" value="Register" />
          </form>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
