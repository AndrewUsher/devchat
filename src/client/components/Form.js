import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextareaFieldGroup from './TextareaFieldGroup'
import { addPost } from '../actions/post'
import '../styles/_post-form.styl'

class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      errors: {}
    }

    this.formChange = this.formChange.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  formSubmit (event) {
    event.preventDefault()

    const { user } = this.props.auth
    const { text } = this.state

    const post = {
      text,
      name: user.name,
      avatar: user.avatar
    }

    this.props.addPost(post)
    this.setState({ text: '' })
  }

  formChange (event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render () {
    const { errors } = this.state

    return (
      <div className="post-form">
        <h2>Say Something...</h2>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <TextareaFieldGroup
              placeholder="Create a post"
              name="text"
              value={this.state.text}
              onChange={this.formChange}
              error={errors.text}
            />
          </div>
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

Form.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { addPost })(Form)
