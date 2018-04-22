const express = require('express')
const router = express.Router()
const passport = require('passport')

// Input Validation
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

// Database Models
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route GET api/posts/hello
// @desc Tests profile route
// @access Public
router.get('/hello', (req, res) => res.json({ message: 'Profile works' }))

// @route GET api/profile
// @desc Get current user's profile
// @access Private
router.get('/',
  passport.authenticate('jwt', { session: false }, (req, res) => {
    let errors = {}
    const { id } = req.user

    Profile.findOne({ user: id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noProfile = 'There is no profile for this user'
          return res.status(404).json(errors)
        }
        // Return profile
        res.json(profile)
      })
      .catch(error => res.status(404).json(error))
  }))

// GET api/profile/all
// @desc Get all profiles
// #access Public
router.get('/all',
  passport.authenticate('jwt', { session: false }, (req, res) => {
    let errors = {}

    Profile
      .find()
      .populate('user', ['name', 'avatar'])
      .then(profiles => {
        if (!profiles) {
          errors.noProfile = 'There are no profiles'
          return res.status(404).json(errors)
        }

        res.json(profiles)
      })
      .catch(() => res.status(404).json({ profile: 'There are no profiles' }))
  }))

// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  let errors = {}
  const { handle } = req.params
  Profile.findOne({ handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user'
        res.status(404).json(errors)
      }

      res.json(profile)
    })
    .catch(error => res.status(404).json(error))
})

// @route   GET api/profile/user/:userId
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:userId', (req, res) => {
  let errors = {}
  const { userId } = req.params

  Profile.findOne({ user: userId })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        res.status(404).json(errors)
      }

      res.json(profile)
    })
    .catch(error => res.status(404).json(error))
})

// @route POST api/profile
// @desc Create user profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }, (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)
  // eslint-disable-next-line max-len
  const { handle, company, website, location, bio, status, githubusername, skills, youtube, twitter, facebook, linkedin, instagram } = req.body
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const { id } = req.user
  // Get fields
  let profileFields = {}
  profileFields.user = id
  if (handle) profileFields.handle = handle
  if (company) profileFields.company = company
  if (website) profileFields.website = website
  if (location) profileFields.location = location
  if (bio) profileFields.bio = bio
  if (status) profileFields.status = status
  if (githubusername) profileFields.githubusername = githubusername

  if (typeof skills !== 'undefined') {
    profileFields.skills = skills.split(',')
  }

  profileFields.social = {}
  if (youtube) profileFields.social.youtube = youtube
  if (twitter) profileFields.social.twitter = twitter
  if (facebook) profileFields.social.facebook = facebook
  if (linkedin) profileFields.social.linkedin = linkedin
  if (instagram) profileFields.social.instagram = instagram

  Profile.findOne({ user: id }).then(profile => {
    if (profile) {
      Profile.findOneAndUpdate({ user: id }, { $set: profileFields }, { new: true })
        .then(profile => res.json(profile))
        .catch(error => res.status(400).json(error))
    } else {
      Profile.findOne({ handle: profileFields.handle })
        .then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists'
            res.status(400).json(errors)
          }

          new Profile(profileFields)
            .save()
            .then(profile => res.json(profile))
        })
    }
  })
}))

// @router POST api/profile/experience
// @desc Add experience to current profile
// @access Private
router.post('/experience', passport.authenticate('jwt', { session: false }, (req, res) => {
  const { id } = req.user
  const { errors, isValid } = validateExperienceInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Profile.find({ user: id })
    .then(profile => {
      const { title, company, location, from, to, current, description } = req.body
      const { experience } = profile
      const newExperience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      }

      experience.unshift(newExperience)
      profile
        .save()
        .then(profile => res.json(profile))
    })
}))

// @router POST api/profile/education
// @desc Add education to current profile
// @access Private
router.post('/education', passport.authenticate('jwt', { session: false }, (req, res) => {
  const { id } = req.user
  const { errors, isValid } = validateEducationInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Profile.find({ user: id })
    .then(profile => {
      const { school, degree, fieldofstudy, from, to, current, description } = req.body
      const { education } = profile
      const newEducation = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      }

      education.unshift(newEducation)
      profile
        .save()
        .then(profile => res.json(profile))
    })
}))

// @router DELETE api/profile/experience/:experienceId
// @desc Delete experience from current profile
// @access Private
router.delete('experience/:experienceId', passport.authenticate('jwt', { session: false }, (req, res) => {
  const { id } = req.user
  const { experienceId } = req.params

  Profile.findOne({ user: id })
    .then(profile => {
      const { experience } = profile
      const removedItem = experience
        .map(({ id }) => id)
        .indexOf(experienceId)

      experience.splice(removedItem, 1)

      profile
        .save()
        .then(profile => res.json(profile))
    })
}))

// @router DELETE api/profile/education/:education_id
// @desc Delete education from current profile
// @access Private
router.delete('education/:educationId', passport.authenticate('jwt', { session: false }, (req, res) => {
  const { id } = req.user
  const { educationId } = req.params

  Profile.findOne({ user: id })
    .then(profile => {
      const { education } = profile
      const removedItem = education
        .map(({ id }) => id)
        .indexOf(educationId)

      education.splice(removedItem, 1)

      profile
        .save()
        .then(profile => res.json(profile))
    })
}))

// @route DELETE api/profile
// @desc Delete user and profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false }, (req, res) => {
  const { id } = req.user
  Profile.findOneAndRemove({ user: id })
    .then(() => {
      User.findOneAndRemove({ _id: id })
    })
    .then(() => {
      res.json({ success: true })
    })
}))

module.exports = router
