import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteExperience } from '../actions/profile'

class Experience extends Component {
  onDeleteClick (id) {
    this.props.deleteExperience(id)
  }

  render () {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>
          {exp.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button onClick={this.onDeleteClick.bind(this, exp._id)}>
            Delete
          </button>
        </td>
      </tr>
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
                <th>Remove</th>
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
  deleteExperience: PropTypes.func.isRequired,
  experience: PropTypes.shape({
    map: PropTypes.func
  })
}

export default connect(null, { deleteExperience })(Experience)
