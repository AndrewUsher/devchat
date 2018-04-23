import React, { Component } from 'react'
import axios from 'axios'

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

  formChange (event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  formSubmit (event) {
    event.preventDefault()

    const { name, email, password, password2 } = this.state
    const user = {
      name,
      email,
      password,
      password2
    }

    axios
      .post('http://localhost:3000/api/users/register', user, { mode: 'no-cors' })
      .then(res => console.log(res.data))
      .catch(error => this.setState({ errors: error.response.data }))
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
                <div className="invalid-feedback">{errors.email}</div>
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
                <div className="invalid-feedback">{errors.password}</div>
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
                <div className="invalid-feedback">{errors.password2}</div>
              )}
            </div>
            <input type="submit" value="Register" />
          </form>
        </div>
      </div>
    )
  }
}

export default Register
