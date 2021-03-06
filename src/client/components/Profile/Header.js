import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ profile }) => {
  let socialLinks
  if (profile.social) {
    socialLinks = (
      <p>

        {profile.social.twitter ? (
          <a
            href={profile.social.twitter}
            target="_blank"
          >
            {/* TODO: ADD SOCIAL ICONS */}
            <i />
          </a>
        ) : null}

        {profile.social.facebook && (
          <a
            href={profile.social.facebook}
            target="_blank"
          >
            {/* TODO: ADD SOCIAL ICONS */}
            <i />
          </a>
        )}

        {profile.social.linkedin && (
          <a
            href={profile.social.linkedin}
            target="_blank"
          >
            {/* TODO: ADD SOCIAL ICONS */}
            <i />
          </a>
        )}

        {profile.social.youtube && (
          <a
            href={profile.social.youtube}
            target="_blank"
          >
            {/* TODO: ADD SOCIAL ICONS */}
            <i />
          </a>
        )}

        {profile.social.instagram && (
          <a
            href={profile.social.instagram}
            target="_blank"
          >
            {/* TODO: ADD SOCIAL ICONS */}
            <i />
          </a>
        )}
      </p>
    )
  } else {
    socialLinks = (
      <p>
        {profile.website && (
          <a
            href={profile.website}
            target="_blank"
          >
            <i />
          </a>
        )}
      </p>
    )
  }

  return (
    <div className="profile-header">
      <img
        src={profile.user.avatar}
        alt={profile.user.name}
      />

      <h2>{profile.user.name}</h2>
      {profile.company && (
        <h3>
          Works at <span>{profile.company}</span>
        </h3>
      )}
      {profile.location && (
        <h3>
          Lives in <span>{profile.location}</span>
        </h3>
      )}
      {socialLinks}
    </div>
  )
}

Header.propTypes = {
  profile: PropTypes.object.isRequired
}

export default Header
