import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from './inputs/TextFieldGroup'
import TextareaFieldGroup from './TextareaFieldGroup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addExperience } from '../actions/profile'

class AddExperience extends Component {
  constructor (props) {
    super(props)
    this.state = {
      company: '',
      title: '',
      location: '',
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
    const { addExperience, history } = this.props
    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    } = this.state

    const experience = {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    }

    addExperience(experience, history)
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
    const { errors } = this.state
    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
      disabled
    } = this.state

    return (
      <div className="modify-profile">
        <div className="modify-profile-info">
          <Link to="/dashboard" className="back-button">
            Go Back
          </Link>
          <h2>Add Experience</h2>
          <div className="form-info">
            Add any job or position that you have had in the past or currently have
          </div>
          <div className="form-info">* = required fields</div>
          <form onSubmit={this.formSubmit}>
            <TextFieldGroup
              placeholder="* Company"
              name="company"
              value={company}
              onChange={this.formChange}
              error={errors.company}
            />
            <TextFieldGroup
              placeholder="* Job Title"
              name="title"
              value={title}
              onChange={this.formChange}
              error={errors.title}
            />
            <TextFieldGroup
              placeholder="Location"
              name="location"
              value={location}
              onChange={this.formChange}
              error={errors.location}
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
              disabled={disabled ? 'disabled' : ''}
            />
            <div className="form-group">
              <input
                type="checkbox"
                name="current"
                value={current}
                checked={current}
                onChange={this.onCheck}
                id="current"
              />
              <label htmlFor="current">
                Current Job
              </label>
            </div>
            <TextareaFieldGroup
              placeholder="Job Description"
              name="description"
              value={description}
              onChange={this.formChange}
              error={errors.description}
              info="Tell us about the the position"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.array
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
)
