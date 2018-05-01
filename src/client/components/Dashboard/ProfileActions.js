import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/_profile-actions.styl'

const ProfileActions = () => (
  <div className="profile-actions">
    <Link to="/edit-profile" >
      Edit Profile
    </Link>
    <Link to="/add-experience">
      Add Experience
    </Link>
    <Link to="/add-education" >
      <i />
      Add Education
    </Link>
  </div>

)

export default ProfileActions
