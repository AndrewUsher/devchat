import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/_home.styl'

const Home = () => (
  <main className="landing">
    <div className="landing-text">
      <h4>Welcome to Devchat</h4>
      <h2>A Friendly and Inclusive Dev Community</h2>
      <h3>Create a profile to show off your skills and chat with other developers</h3>
      <div className="landing-buttons">
        <Link to="/register">Register</Link>
      </div>
    </div>
  </main>
)

export default Home
