import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteComment } from '../actions/post'

class CommentItem extends Component {
  onDeleteClick (postId, commentId) {
    this.props.deleteComment(postId, commentId)
  }

  render () {
    const { comment, postId, auth } = this.props

    return (
      <div className="comment">
        <img
          src={comment.avatar}
          alt=""
        />
        <h3>{comment.name}</h3>
        <h4>{comment.text}</h4>
        {comment.user === auth.user.id ? (
          <button
            onClick={this.onDeleteClick.bind(this, postId, comment._id)}
            type="button"
          >
            Delete
          </button>
        ) : null}

      </div>
    )
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)
