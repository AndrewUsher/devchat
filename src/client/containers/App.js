import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../store/index'
import addAuthToken from '../utils/addAuthToken'
import { setUser, logoutUser } from '../actions/auth'
import { clearProfile } from '../actions/profile'
import jwtDecode from 'jwt-decode'

// import components

import Header from '../components/Header'
import Home from '../components/Home'
import Dashboard from '../components/Dashboard'
import Developers from '../components/Developers'
import Login from '../components/Login'
import Register from '../components/Register'
import Footer from '../components/Footer'
import CreateProfile from '../components/CreateProfile'
import EditProfile from '../components/EditProfile'
import AddExperience from '../components/AddExperience'
import AddEducation from '../components/AddEducation'

if (localStorage.token) {
  const { token } = localStorage
  addAuthToken(token)
  const decodedToken = jwtDecode(token)
  store.dispatch(setUser(decodedToken))

  const currentTime = Date.now() / 1000
  if (decodedToken.exp < currentTime) {
    store.dispatch(logoutUser())
    store.dispatch(clearProfile())
    window.location.href = '/login'
  }
}

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/developers" component={Developers} />
            <Route exact path="/create-profile" component={CreateProfile} />
            <Route exact path="/edit-profile" component={EditProfile} />
            <Route exact path="/add-experience" component={AddExperience} />
            <Route exact path="/add-education" component={AddEducation} />
            <Footer />
          </div>
        </Router>
      </Provider >
    )
  }
}

export default App
