import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PostItem from './PostItem'
import CommentForm from './Comments/Form'
import CommentFeed from './Comments/Feed'
import Loader from '../utils/Loader'
import { getPost } from '../../actions/post'

class Post extends Component {
  componentDidMount () {
    this.props.getPost(this.props.match.params.id)
  }

  render () {
    const { post, loading } = this.props

    let postContent

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Loader />
    } else if (!post.comments) {
      postContent = (
        <div className="single-post">
          <h2>No comments yet. Be the first one!</h2>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
        </div>
      )
    } else {
      postContent = (
        <div className="single-post">
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      )
    }

    return (
      <div className="post">
        <Link to="/feed" className="back-button">
          Back To Feed
        </Link>
        {postContent}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
