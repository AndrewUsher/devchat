import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/auth'
import { clearProfile } from '../../actions/profile'
import '../../styles/_header.styl'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transparent: false
    }
    this.logoutUser = this.logoutUser.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', () => {
      let scrollPosition = window.scrollY

      scrollPosition < 60 ? this.setState({ transparent: true }) : this.setState({ transparent: false })
    })
  }

  logoutUser (event) {
    event.preventDefault()
    this.props.clearProfile()
    this.props.logoutUser()
  }

  render () {
    const { isAuthed, user } = this.props.auth
    const { transparent } = this.state
    let navLinks
    if (isAuthed) {
      navLinks = (
        <nav>
          <li>
            <Link to="/feed">Feed</Link>
          </li>
          <li>
            <Link to="/profiles">Developers</Link>
          </li>
          <li>
            <Link to="/dashboard">
              <img src={user.avatar} alt={user.name} title="You must have a Gravatar to display an image" />
            </Link>
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
      <header className={transparent ? "none" : "colored"}>
        <h1>Devchat</h1>
        {navLinks}
      </header>
    )
  }
}

Header.propTypes = {
  clearProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { clearProfile, logoutUser })(Header)
