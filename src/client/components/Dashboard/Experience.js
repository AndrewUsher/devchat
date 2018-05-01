import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

class Experience extends Component {
  render () {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
      </tr >
    ))
    return (
      <div className="experience">
        <div className="container">
          <h4>Experience Credentials</h4>
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Title</th>
                <th>Years</th>
              </tr>
              {experience}
            </thead>
          </table>
        </div>
      </div>
    )
  }
}

Experience.propTypes = {
  experience: PropTypes.array
}

export default Experience
