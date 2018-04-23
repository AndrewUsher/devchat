import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/auth'

class Header extends Component {
  constructor (props) {
    super(props)
    this.logoutUser = this.logoutUser.bind(this)
  }

  logoutUser (event) {
    event.preventDefault()
    this.props.logoutUser()
  }
  render () {
    const { isAuthed, user } = this.props.auth
    let navLinks
    if (isAuthed) {
      navLinks = (
        <nav>
          <li>
            <Link to="/developers">Developers</Link>
          </li>
          <li>
            <img src={user.avatar} alt={user.name} title="You must have a Gravatar to display an image" />
          </li>
          <li>
            <a href="#" onClick={this.logoutUser}>Logout</a>
          </li>
        </nav>
      )
    } else {
      navLinks = (
        <nav>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </nav>
      )
    }

    return (
      <header>
        <h1>Devchat</h1>
        {navLinks}
      </header>
    )
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Header)
