import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextareaFieldGroup from './inputs/TextareaFieldGroup'
import { addComment } from '../actions/post'

class CommentForm extends Component {
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
    const { postId } = this.props
    const { text } = this.state

    const comment = {
      text,
      name: user.name,
      avatar: user.avatar
    }

    this.props.addComment(postId, comment)
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
        <h2>Add a comment</h2>
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { addComment })(CommentForm)
