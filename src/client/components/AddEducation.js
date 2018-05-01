import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from './inputs/TextFieldGroup'
import TextareaFieldGroup from './inputs/TextareaFieldGroup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addEducation } from '../actions/profile'

class AddEducation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    }

    this.formChange = this.formChange.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
    this.onCheck = this.onCheck.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { errors } = nextProps
    if (errors) {
      this.setState({ errors })
    }
  }

  formSubmit (event) {
    event.preventDefault()
    const { history } = this.props
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = this.state

    const education = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }

    this.props.addEducation(education, history)
  }

  formChange (event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  onCheck () {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }

  render () {
    const {
      errors,
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = this.state

    return (
      <div className="modify-profile">
        <div className="modify-profile-info">
          <Link to="/dashboard" className="back-button">
            Go Back
          </Link>
          <h2>Add Education</h2>
          <div className="form-info">
            Add any school, bootcamp, etc that you have attended
          </div>
          <div className="form-info">* = required fields</div>
          <form onSubmit={this.formSubmit}>
            <TextFieldGroup
              placeholder="* School"
              name="school"
              value={school}
              onChange={this.formChange}
              error={errors.school}
            />
            <TextFieldGroup
              placeholder="* Degree or Certification"
              name="degree"
              value={degree}
              onChange={this.formChange}
              error={errors.degree}
            />
            <TextFieldGroup
              placeholder="* Field of Study"
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={this.formChange}
              error={errors.fieldofstudy}
            />
            <h3>From Date</h3>
            <TextFieldGroup
              name="from"
              type="date"
              value={from}
              onChange={this.formChange}
              error={errors.from}
            />
            <h3>To Date</h3>
            <TextFieldGroup
              name="to"
              type="date"
              value={to}
              onChange={this.formChange}
              error={errors.to}
              disabled={this.state.disabled ? 'disabled' : ''}
            />
            <div className="form-group">
              <input
                type="checkbox"
                className="form-check-input"
                name="current"
                value={current}
                checked={current}
                onChange={this.onCheck}
                id="current"
              />
              <label htmlFor="current" >
                Current Job
              </label>
            </div>
            <TextareaFieldGroup
              placeholder="Program Description"
              name="description"
              value={description}
              onChange={this.formChange}
              error={errors.description}
              info="Tell us about the program that you were in"
            />
            <input
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    )
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  history: PropTypes.object,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation))
