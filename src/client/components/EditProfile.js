import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from './inputs/TextFieldGroup'
import TextareaFieldGroup from './TextareaFieldGroup'
import InputGroup from './InputGroup'
import { createProfile, getProfile } from '../actions/profile'
import isEmpty from '../../validation/is-empty'
import '../styles/_modify-profile.styl'

class EditProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.props.getProfile()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(',')

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : ''
      profile.website = !isEmpty(profile.website) ? profile.website : ''
      profile.location = !isEmpty(profile.location) ? profile.location : ''
      profile.githubusername = !isEmpty(profile.githubusername) ?
        profile.githubusername :
        ''
      profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
      profile.social = !isEmpty(profile.social) ? profile.social : {}
      profile.twitter = !isEmpty(profile.social.twitter) ?
        profile.social.twitter :
        ''
      profile.facebook = !isEmpty(profile.social.facebook) ?
        profile.social.facebook :
        ''
      profile.linkedin = !isEmpty(profile.social.linkedin) ?
        profile.social.linkedin :
        ''
      profile.youtube = !isEmpty(profile.social.youtube) ?
        profile.social.youtube :
        ''
      profile.instagram = !isEmpty(profile.social.instagram) ?
        profile.social.instagram :
        ''

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube
      })
    }
  }

  onSubmit (e) {
    e.preventDefault()

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }

    this.props.createProfile(profileData, this.props.history)
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { errors, displaySocialInputs } = this.state

    let socialInputs

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      )
    }

    return (
      <div className="modify-profile">
        <div className="modify-profile-info">
          <Link to="/dashboard" className="back-button">
                Go Back
          </Link>
          <h1>Edit Profile</h1>
          <div className="form-info">* = required fields</div>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Profile Handle"
              name="handle"
              value={this.state.handle}
              onChange={this.onChange}
              error={errors.handle}
              info="A unique handle for your profile URLz"
            />
            <TextFieldGroup
              placeholder="Company"
              name="company"
              value={this.state.company}
              onChange={this.onChange}
              error={errors.company}
              info="Could be your own company or one you work for"
            />
            <TextFieldGroup
              placeholder="Website"
              name="website"
              value={this.state.website}
              onChange={this.onChange}
              error={errors.website}
              info="Could be your own website or a company one"
            />
            <TextFieldGroup
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              error={errors.location}
              info="City or city & state suggested (eg. Memphis, TN)"
            />
            <TextFieldGroup
              placeholder="* Skills"
              name="skills"
              value={this.state.skills}
              onChange={this.onChange}
              error={errors.skills}
              info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
            />
            <TextFieldGroup
              placeholder="Github Username"
              name="githubusername"
              value={this.state.githubusername}
              onChange={this.onChange}
              error={errors.githubusername}
              info="If you want your latest repos and a Github link, include your username"
            />
            <TextareaFieldGroup
              placeholder="Short Bio"
              name="bio"
              value={this.state.bio}
              onChange={this.onChange}
              error={errors.bio}
              info="Tell us a little about yourself"
            />

            <div>
              <button
                type="button"
                onClick={() => {
                  this.setState(prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                  }))
                }}

              >
                    Add Social Network Links
              </button>
              <span>Optional</span>
            </div>
            {socialInputs}
            <input
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    )
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  history: PropTypes.array,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getProfile })(
  withRouter(EditProfile)
)
