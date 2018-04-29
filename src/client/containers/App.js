import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../store/index'
import addAuthToken from '../utils/addAuthToken'
import { setUser, logoutUser } from '../actions/auth'
import { clearProfile } from '../actions/profile'
import jwtDecode from 'jwt-decode'

// import components

import PrivateRoute from '../components/PrivateRoute'
import Header from '../components/Header'
import Home from '../components/Home'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import Register from '../components/Register'
import Footer from '../components/Footer'
import CreateProfile from '../components/CreateProfile'
import EditProfile from '../components/EditProfile'
import AddExperience from '../components/AddExperience'
import AddEducation from '../components/AddEducation'
import Profiles from '../components/Profiles'
import Profile from '../components/Profile'
import Posts from '../components/Posts'
import Post from '../components/Post'

if (localStorage.token) {
  const { token } = localStorage
  addAuthToken(token)
  const decodedToken = jwtDecode(token)
  store.dispatch(setUser(decodedToken))

  const currentTime = Date.now() / 1000
  if (decodedToken.exp < currentTime) {
    store.dispatch(logoutUser())
    store.dispatch(clearProfile())
    window.location.href = '/home'
  }
}

class App extends Component {
  componentDidMount () {
    console.log(this.props)
  }
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>

            <Route exact path="/profile/:handle" component={Profile} />
            <Route exact path="/feed" component={Posts} />
            <Route exact path="/post/:id" component={Post} />
            <Route exact path="/profiles" component={Profiles} />
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
