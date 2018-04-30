import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import About from './About'
import Credentials from './Credentials'
import Github from './Github'
import Loader from './Loader'
import { getProfileByHandle } from '../actions/profile'

class Profile extends Component {
  componentDidMount () {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found')
    }
  }

  render () {
    const { profile, loading } = this.props.profile
    let content

    if (profile === null || loading) {
      content = <Loader />
    } else {
      content = (
        <div>
          <Link to="/profiles">
            Back To Profiles
          </Link>
          <ProfileHeader profile={profile} />
          <About profile={profile} />
          <Credentials
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername && (
            <Github username={profile.githubusername} />
          )}
        </div>
      )
    }

    return (
      <div className="profile">
        <div className="container">
          {content}
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  history: PropTypes.array,
  match: PropTypes.object,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile)
