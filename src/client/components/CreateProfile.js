import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { createProfile } from '../actions/profile'
import InputGroup from './InputGroup'
import TextareaFieldGroup from './inputs/TextareaFieldGroup'
import TextFieldGroup from './inputs/TextFieldGroup'
import '../styles/_modify-profile.styl'

class CreateProfile extends Component {
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

    this.formChange = this.formChange.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { errors } = nextProps
    if (errors) {
      this.setState({ errors })
    }
  }

  formSubmit (event) {
    event.preventDefault()
    const { history } = this.props
    const {
      handle,
      company,
      website,
      location,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    } = this.state

    const profile = {
      handle,
      company,
      website,
      location,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    }

    this.props.createProfile(profile, history)
  }

  formChange (event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render () {
    const { errors, displaySocialInputs } = this.state

    let socialFields

    if (displaySocialInputs) {
      socialFields = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            value={this.state.twitter}
            onChange={this.formChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            value={this.state.facebook}
            onChange={this.formChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            value={this.state.linkedin}
            onChange={this.formChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            value={this.state.youtube}
            onChange={this.formChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            value={this.state.instagram}
            onChange={this.formChange}
            error={errors.instagram}
          />
        </div>
      )
    }

    return (
      <div className="modify-profile">
        <div className="modify-profile-info">
          <h2>Create Your Profile</h2>
          <h3 className="form-info">* = required fields</h3>
          <form onSubmit={this.formSubmit}>
            <TextFieldGroup
              placeholder="* Profile Handle"
              name="handle"
              value={this.state.handle}
              onChange={this.formChange}
              error={errors.handle}
              info="A unique handle for your profile URL"
            />

            <TextFieldGroup
              placeholder="Company"
              name="company"
              value={this.state.company}
              onChange={this.formChange}
              error={errors.company}
              info="Could be your own company or one you work for"
            />
            <TextFieldGroup
              placeholder="Website"
              name="website"
              value={this.state.website}
              onChange={this.formChange}
              error={errors.website}
              info="Could be your own website or a company one"
            />
            <TextFieldGroup
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.formChange}
              error={errors.location}
              info="City or city + state suggested (eg. Memphis, TN)"
            />
            <TextFieldGroup
              placeholder="* Skills"
              name="skills"
              value={this.state.skills}
              onChange={this.formChange}
              error={errors.skills}
              info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,React"
            />
            <TextFieldGroup
              placeholder="Github Username"
              name="githubusername"
              value={this.state.githubusername}
              onChange={this.formChange}
              error={errors.githubusername}
              info="If you want your latest repos and a Github link, include your username"
            />
            <TextareaFieldGroup
              placeholder="Short Bio"
              name="bio"
              value={this.state.bio}
              onChange={this.formChange}
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
              <div className="form-info">Optional</div>
            </div>
            {socialFields}
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  history: PropTypes.array,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
)
