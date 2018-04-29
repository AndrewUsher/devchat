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
  passport.authenticate('jwt', { session: false }), (req, res) => {
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
  })

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
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const profileFields = {}
  profileFields.user = req.user.id
  if (req.body.handle) profileFields.handle = req.body.handle
  if (req.body.company) profileFields.company = req.body.company
  if (req.body.website) profileFields.website = req.body.website
  if (req.body.location) profileFields.location = req.body.location
  if (req.body.bio) profileFields.bio = req.body.bio
  if (req.body.githubusername) { profileFields.githubusername = req.body.githubusername }
  // Skills - Spilt into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',')
  }

  // Social
  profileFields.social = {}
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile))
    } else {
      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists'
          res.status(400).json(errors)
        }

        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile))
      })
        .catch(error => console.log(error))
    }
  })
}
)

// @router POST api/profile/experience
// @desc Add experience to current profile
// @access Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.user
  const { errors, isValid } = validateExperienceInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: id })
    .then(profile => {
      const { title, company, location, from, to, current, description } = req.body
      let { experience } = profile
      const newExperience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      }

      if (!experience) {
        experience = []
        experience.push(newExperience)
      } else {
        experience.unshift(newExperience)
      }

      profile
        .save()
        .then(profile => res.json(profile))
    })
})

// @router POST api/profile/education
// @desc Add education to current profile
// @access Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.user
  const { errors, isValid } = validateEducationInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: id })
    .then(profile => {
      const { school, degree, fieldofstudy, from, to, current, description } = req.body
      const newEducation = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      }

      if (!profile.education) {
        profile.education = []
        profile.education.push(newEducation)
      } else {
        profile.education.unshift(newEducation)
      }

      profile
        .save()
        .then(profile => res.json(profile))
    })
    .catch(error => console.log(error))
})

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
