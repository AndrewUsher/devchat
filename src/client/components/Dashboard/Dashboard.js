import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteAccount, getProfile } from '../../actions/profile'
import Loader from '../utils/Loader'
import ProfileActions from './ProfileActions'
import Experience from './Experience'
import Education from './Education'
import '../../styles/_dashboard.styl'

class Dashboard extends Component {
  componentDidMount () {
    this.props.getProfile()
  }

  deleteAccount () {
    this.props.deleteAccount()
  }
  render () {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile
    let content

    if (profile === null || loading) {
      content = <Loader />
    } else if (Object.keys(profile).length > 0) {
      content = (
        <div>
          <h3>
            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
          </h3>
          <ProfileActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div style={{ marginBottom: '60px' }} />
          <button
            onClick={this.deleteAccount.bind(this)}
          >
            Delete My Account
          </button>
        </div>
      )
    } else {
      content = (
        <div>
          <p>Welcome to Devchat {user.name}</p>
          <p>You haven't setup a profile yet, please add some info</p>
          <Link to="/create-profile">
            Create Profile
          </Link>
        </div>
      )
    }
    return (
      <div className="dashboard">
        <div className="dashboard-info">
          <h2>Dashboard</h2>
          {content}
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { deleteAccount, getProfile })(Dashboard)
