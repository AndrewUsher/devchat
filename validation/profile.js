const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput (data) {
  let errors = {}
  const handleLength = {
    min: 2,
    max: 40
  }
  let { handle, status, skills, website, youtube, linkedin, facebook, instagram, twitter } = data
  handle = !isEmpty(handle) ? handle : ''
  status = !isEmpty(status) ? status : ''
  skills = !isEmpty(skills) ? skills : ''

  if (!Validator.isLength(handle, handleLength)) {
    errors.handle = 'Handle needs to be between 2 and 40 characters'
  }

  if (Validator.isEmpty(handle)) {
    errors.handle = 'Profile handle is required'
  }

  if (Validator.isEmpty(skills)) {
    errors.handle = 'Skills fieldis required'
  }

  if (Validator.isEmpty(status)) {
    errors.handle = 'Status field is required'
  }

  if (!isEmpty(website)) {
    if (!Validator.isURL(website)) {
      errors.website = 'Not a valid url'
    }
  }

  if (!isEmpty(youtube)) {
    if (!Validator.isURL(youtube)) {
      errors.youtube = 'Not a valid url'
    }
  }

  if (!isEmpty(linkedin)) {
    if (!Validator.isURL(linkedin)) {
      errors.linkedin = 'Not a valid url'
    }
  }

  if (!isEmpty(facebook)) {
    if (!Validator.isURL(facebook)) {
      errors.facebook = 'Not a valid url'
    }
  }

  if (!isEmpty(instagram)) {
    if (!Validator.isURL(instagram)) {
      errors.instagram = 'Not a valid url'
    }
  }

  if (!isEmpty(twitter)) {
    if (!Validator.isURL(twitter)) {
      errors.twitter = 'Not a valid url'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
