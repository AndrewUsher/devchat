import React, { Component } from 'react'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
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
    return (
      <div className="login">
        <div className="container">
          <p>Sign in to Devchat</p>
          <form onSubmit={this.formSubmit} >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={this.formChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" onChange={this.formChange} />
            </div>
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    )
  }
}

export default Login
