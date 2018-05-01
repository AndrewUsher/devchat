import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/auth'
import TextFieldGroup from '../inputs/TextFieldGroup'
import '../../styles/_onboarding.styl'

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
      <div className="onboarding">
        <div className="onboarding-info">
          <h2>Sign Up</h2>
          <form noValidate onSubmit={this.formSubmit}>

            <TextFieldGroup
              placeholder="Full Name"
              name="name"
              type="text"
              value={name}
              onChange={this.formChange}
              error={errors.name}
            />
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
            <TextFieldGroup
              placeholder="Confirm Password"
              name="password2"
              type="password"
              value={password2}
              onChange={this.formChange}
              error={errors.password2}
            />
            <button type="submit">Sign Up</button>
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
