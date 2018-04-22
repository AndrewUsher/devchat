import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <main className="landing">
    <div className="landing-text">
      <h2>Welcome to Devchat!</h2>
      <h3>Create a profile with your skills, and chat with other developers</h3>
      <div className="landing-buttons">
        <Link to="/register" />
        <Link to="/login" />
      </div>
    </div>
  </main>
)

export default Home
