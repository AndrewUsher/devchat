import React from 'react'
import PropTypes from 'prop-types'
import CommentItem from './CommentItem'

const Feed = ({ comments, postId }) => {
  return comments.map(comment => (
    <CommentItem key={comment._id} comment={comment} postId={postId} />
  ))
}

Feed.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.string
}

export default Feed
