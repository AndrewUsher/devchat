import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ auth }) => {
  let output
  if (auth) {
    output = (
      <header>
        <h1>Devchat</h1>
        <nav>
          <li>
            <Link to="/developers">Developers</Link>
          </li>
          <img />
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </nav>
      </header>
    )
  } else {
    output = (
      <header>
        <h1>Devchat</h1>
        <nav>
          <li>
            <Link to="/developers">Developers</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </nav>
      </header>
    )
  }

  return <div>{output}</div>
}

export default Header
