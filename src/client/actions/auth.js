import axios from 'axios'
import addAuthToken from '../utils/addAuthToken'
import jwtDecode from 'jwt-decode'

import { GET_ERRORS, SET_USER } from './types'

export const setUser = decodedToken => {
  return {
    type: SET_USER,
    payload: decodedToken
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('token')
  addAuthToken(false)
  dispatch(setUser({}))
}

export const registerUser = (user, history) => dispatch => {
  axios
    .post('http://localhost:3000/api/users/register', user)
    .then(() => history.push('/login'))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    )
}

export const loginUser = user => dispatch => {
  axios
    .post('http://localhost:3000/api/users/login', user)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('token', token)

      addAuthToken(token)

      const decodedToken = jwtDecode(token)

      dispatch(setUser(decodedToken))
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    )
}
