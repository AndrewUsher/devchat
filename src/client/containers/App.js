import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import components
import Header from '../components/Header'
import Home from '../components/Home'
import Developers from '../components/Developers'
import Login from '../components/Login'
import Register from '../components/Register'
import Footer from '../components/Footer'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Header auth={false} />
          <Route exact path="/" component={Home} />
          <Route exact path="/developers" component={Developers} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
