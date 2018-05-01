import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Form from './Form'
import Feed from './Feed'
import Loader from '../utils/Loader'
import { getPosts } from '../../actions/post'
import '../../styles/_posts.styl'

class Posts extends Component {
  componentDidMount () {
    this.props.getPosts()
  }

  render () {
    const { posts, loading } = this.props.post
    let postContent

    if (posts === null || loading) {
      postContent = <Loader />
    } else if (posts.length > 0) {
      postContent = <Feed posts={posts} />
    }

    return (
      <div className="posts">
        <div className="posts-info">
          <Form />
          {postContent}
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts)
