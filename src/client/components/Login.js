import React, { Component } from 'react'

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

    console.log(user)
  }
  render () {
    const { errors } = this.state
    return (
      <div className="login">
        <div className="container">
          <p>Sign in to Devchat</p>
          <form onSubmit={this.formSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={this.formChange} />
              {errors.email && (
                <div className="form-invalid">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" onChange={this.formChange} />
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

export default Login
