import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, addLike, removeLike } from '../actions/post'
import '../styles/_post-item.styl'

class PostItem extends Component {
  onDeleteClick (id) {
    this.props.deletePost(id)
  }

  onLikeClick (id) {
    this.props.addLike(id)
    console.log(this.props.post.user)
  }

  onUnlikeClick (id) {
    this.props.removeLike(id)
  }

  findUserLike (likes) {
    const { auth } = this.props
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true
    } else {
      return false
    }
  }

  render () {
    const { post, auth, showActions } = this.props

    return (
      <div className="single-post">
        <h2>{post.name}</h2>
        <h3>{post.text}</h3>
        {showActions && (
          <div>
            <button
              onClick={this.onLikeClick.bind(this, post._id)}
              type="button"
            >Like <span>{post.likes.length}</span>
            </button>
            <button
              onClick={this.onUnlikeClick.bind(this, post._id)}
              type="button"

            >Unlike
              <i />
            </button>

            <Link to={`/post/${post._id}`} >
              Comments
            </Link>
            {post.name === auth.user.name && (
              <button
                onClick={this.onDeleteClick.bind(this, post._id)}
                type="button"
              >Delete
                <i />
              </button>
            )}
          </div>
        )
        }
      </div>
    )
  }
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
)
