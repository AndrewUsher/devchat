import React from 'react'
import Moment from 'react-moment'

const Credentials = ({ experience, education }) => {
  const expItems = experience.map(exp => (
    <li key={exp._id}>
      <h4>{exp.company}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position:</strong> {exp.title}
      </p>
      <p>
        {exp.location === '' ? null : (
          <span>
            <strong>Location: </strong> {exp.location}
          </span>
        )}
      </p>
      <p>
        {exp.description === '' ? null : (
          <span>
            <strong>Description: </strong> {exp.description}
          </span>
        )}
      </p>
    </li>
  ))

  const eduItems = education.map(edu => (
    <li key={edu._id} >
      <h4>{edu.school}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree:</strong> {edu.degree}
      </p>
      <p>
        <strong>Field Of Study:</strong> {edu.fieldofstudy}
      </p>
      <p>
        {edu.description === '' ? null : (
          <span>
            <strong>Description: </strong> {edu.description}
          </span>
        )}
      </p>
    </li>
  ))
  return (
    <div className="credentials">
      <h3>Experience</h3>
      {expItems.length > 0 ? (
        <ul>{expItems}</ul>
      ) : (
        <p>No Experience Listed</p>
      )}
      <h3>Education</h3>
      {eduItems.length > 0 ? (
        <ul>{eduItems}</ul>
      ) : (
        <p>No Education Listed</p>
      )}
    </div>
  )
}

export default Credentials
