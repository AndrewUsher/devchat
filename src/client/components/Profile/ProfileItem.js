import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../../styles/_profile-item.styl'

const ProfileItem = ({ profile }) => (
  <div className="profile-item">
    <img src={profile.user.avatar} alt={profile.user.name} />
    <div>
      <h3>{profile.user.name}</h3>
      <h4>
        {profile.company && (
          <span>at {profile.company}</span>
        )}
      </h4>
      <h4>
        {profile.location && (
          <span>{profile.location}</span>
        )}
      </h4>
      <Link to={`/profile/${profile.handle}`} className="view-profile">
        View Profile
      </Link>
      <h5>Skill Set</h5>
      <ul>
        {profile.skills.slice(0, 4).map((skill, index) => (
          <li key={index} >
            <i />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  </div>
)

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
