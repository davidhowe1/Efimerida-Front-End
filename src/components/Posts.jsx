import { React } from 'react'
import { Heart } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

function Posts({ posts, users, showUsers, storePostContentForRender }) {
    
  return (
      <>
        {!showUsers ? posts.slice(0).reverse().map(post => (
            <Link key={post.id} to={`/Article/post-id/${post.id}`}><article onClick={storePostContentForRender}
                id={post.id} className='post-card'>

            <div className='left-side'>
                <div>
                    <div className='author-and-time'>
                        <h4>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
                        {post.post_author.username.charAt(0).toUpperCase()
                        + post.post_author.username.slice(1)}</h4>
                        <p>{post.post_created_date.substring(0, 16).replace(/T/, ', ')}</p>
                    </div>
                    
                    <h1>{post.post_title}</h1>
                    <p className='text' dangerouslySetInnerHTML={{__html: post.post_text}}></p>
                </div>

                <div className='social'>
                    <p>{post.post_views} Views</p>

                    <p title={`${post.post_likes.length} have liked this post`}>
                        {post.post_likes.length}
                        <Heart style={{padding: '0px 5px'}}/>
                    </p>
                </div>
            </div>
    
            <div className='right-side'>
                <img 
                    src={
                        post.post_image && (
                          post.post_image.startsWith('http://127.0.0.1:8000')
                            ? post.post_image
                            : `http://127.0.0.1:8000${post.post_image}`
                        )
                      } alt="" />
            </div>
            </article></Link>
        )) :  users.map((user) => (
                <article className='user' key={user.id}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
                    <h1>{user.username}</h1>
                </article>
        ))}
      </>
  )
}

export default Posts