import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteEducation } from '../actions/profile'

class Education extends Component {
  render () {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
      </tr>
    ))
    return (
      <div>
        <h4>Education Credentials</h4>
        <table>
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Time Period</th>
            </tr>
            {education}
          </thead>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  education: PropTypes.shape({
    map: PropTypes.func
  })
}

export default connect(null, { deleteEducation })(Education)
