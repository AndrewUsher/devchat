import React from 'react'
import PropTypes from 'prop-types'

const About = (props) => {
  const { profile } = props

  const firstName = profile.user.name.trim().split(' ')[0]

  const skills = profile.skills.map((skill, index) => (
    <div key={index}>
      <p>{skill}</p>
    </div>
  ))

  return (
    <div className="profile-about">
      <h3>{firstName}'s Bio</h3>
      <p>
        {profile.bio ? (
          <span>{firstName} does not have a bio</span>
        ) : (
            <span>{profile.bio}</span>
          )}
      </p>
      <h3>Skill Set</h3>
      <div>
        {skills}
      </div>
    </div>
  )
}

About.propTypes = {
  profile: PropTypes.object.isRequired
}

export default About
