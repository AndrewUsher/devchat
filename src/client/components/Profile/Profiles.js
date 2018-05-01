import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Loader from '../utils/Loader'
import ProfileItem from './ProfileItem'
import { getProfiles } from '../../actions/profile'
import '../../styles/_profiles.styl'

class Profiles extends Component {
  componentDidMount () {
    this.props.getProfiles()
  }

  render () {
    const { profiles, loading } = this.props.profile
    let content

    if (profiles === null || loading) {
      content = <Loader />
    } else if (profiles.length > 0) {
      content = profiles.map(profile => (
        <ProfileItem key={profile._id} profile={profile} />
      ))
    } else {
      content = <h4>No profiles found...</h4>
    }

    return (
      <div className="profiles">
        <div className="profiles-info">
          <h2>Developer Profiles</h2>
          <h3>
            Browse all developers and connect with any of them
          </h3>
          {content}
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
