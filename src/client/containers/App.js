import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loadmang from '../components/utils/LoadMang'
import { Provider } from 'react-redux'
import store from '../store/index'
import addAuthToken from '../utils/addAuthToken'
import { setUser, logoutUser } from '../actions/auth'
import { clearProfile } from '../actions/profile'
import jwtDecode from 'jwt-decode'

// import components
import PrivateRoute from '../components/utils/PrivateRoute'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Home from '../components/Onboarding/Home'
const Dashboard = Loadmang(() => import('../components/Dashboard/Dashboard'))
const Register = Loadmang(() => import('../components/Onboarding/Register'))
const Login = Loadmang(() => import('../components/Onboarding/Login'))
const CreateProfile = Loadmang(() => import('../components/Onboarding/CreateProfile'))
const EditProfile = Loadmang(() => import('../components/Dashboard/EditProfile'))
const AddExperience = Loadmang(() => import('../components/Dashboard/AddExperience'))
const AddEducation = Loadmang(() => import('../components/Dashboard/AddEducation'))
const Profiles = Loadmang(() => import('../components/Profile/Profiles'))
const Profile = Loadmang(() => import('../components/Profile/Profile'))
const Posts = Loadmang(() => import('../components/Post/Posts'))
const Post = Loadmang(() => import('../components/Post/Post'))

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
            <Switch>
              <PrivateRoute exact path="/profile/:handle" component={Profile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/feed" component={Posts} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/profiles" component={Profiles} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider >
    )
  }
}

export default App
