import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_PROFILE, SET_USER, GET_PROFILES } from './types'

export const setLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

export const clearProfile = () => {
  return {
    type: CLEAR_PROFILE
  }
}

export const createProfile = (profile, history) => dispatch => {
  axios
    .post(`http://localhost:3000/api/profile`, profile)
    .then(res => history.push('/dashboard'))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    )
}

export const getProfile = () => dispatch => {
  dispatch(setLoading())

  axios
    .get('http://localhost:3000/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(() =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
}

export const getProfileByHandle = handle => dispatch => {
  dispatch(setLoading())

  axios
    .get(`http://localhost:3000/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(() =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
}

export const addEducation = (education, history) => dispatch => {
  axios
    .post('http://localhost:3000/api/profile/education', education)
    .then(() => history.push('/dashboard'))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.data
      })
    )
}

export const addExperience = (experience, history) => dispatch => {
  axios
    .post('http://localhost:3000/api/profile/experience', experience)
    .then(res => history.push('/dashboard'))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    )
}

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('This action cannot be undone. Are you sure?')) {
    axios
      .delete('http://localhost:3000/api/profile')
      .then(res =>
        dispatch({
          type: SET_USER,
          payload: {}
        })
      )
      .catch(error =>
        dispatch({
          type: GET_ERRORS,
          payload: error.res.data
        })
      )
  }
}

export const getProfiles = () => dispatch => {
  axios
    .get('http://localhost:3000/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    )
}
