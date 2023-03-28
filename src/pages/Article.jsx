import { React, useState, useEffect, useRef } from 'react'
import { Chat, ChevronLeft, Eye, Heart } from 'react-bootstrap-icons'
import Comments from '../components/Comments'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Article({
  fetchTagData,
  tags,
  handleAlertMessage,
  showLoginWindow,
  renderProfileImages,
  subscribeToUser,
  subscribedUsers,
  unsubscribeFromUser,
  userData,
  userId,
  token,
  getImageSrc
}) {
    
  const [content, setContent] = useState([]);
  const [userSubscribeId, setUserSubscribeId] = useState();
  const { id } = useParams();
  const username = userData ? userData.username : '';
  const [commentsLength, setCommentsLength] = useState(0);
  const handleCommentsLength = (length) => setCommentsLength(length);
  const navigateToAllPosts = useNavigate();

  const commentsRef = useRef();
  const scrollToComments = () => {
    commentsRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center',
    });
  };
  const navigateBackToTop = () => window.scrollTo(0, 0);

  const renderPostContent = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/post/detail/${id}/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      await setContent([data])
      await setUserSubscribeId(data.post_author.id)
    } catch (error) {
      console.error(error)
    }
  }

  const likeCurrentPost = async () => {
    if (token) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/post/like/${id}/`, {
          method: 'POST',
          headers: {
            Authorization: `Token ${token}`,
          }
        })
        if (response.ok) {
          await renderPostContent()
          await handleAlertMessage('You liked this post.')
        }
    } catch (error) {
      console.error(error)
    }
  } else { showLoginWindow() }
}

const deletePost = async (event) => {
  event.preventDefault()
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/post/detail/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      if (response.ok) {
        await navigateToAllPosts('/All')
      } else {
        console.log('Error: ', response.statusText)
        }
      } catch (error) {
        console.log('Error: ', error)
      }
    }
  }

  useEffect(() => {
    renderPostContent();
    fetchTagData();
    window.scrollTo(0, 0);
  }, []);

  let postTags;

  if (content.length > 0) {
    postTags = content[0].post_tags;
  } else {
    return postTags;
  }

  const matchingTags = postTags.map((num) => {
    const postTags = tags.find((tag) => tag.id === num);
    return postTags ? postTags.tag_name : null;
  });

  return (
    <>
      {content
        ? content.map((article) => (
            <article key={article.id} className='post'>
              <div className='close-button'>
                <h1>{article.post_title}</h1>

                <span
                  onClick={() => {
                    history.back();
                  }}
                >
                  <ChevronLeft
                    style={{
                      height: '20px',
                      width: '20px',
                      padding: '0px 5px',
                    }}
                  />
                  <p>{`Back`}</p>
                </span>
              </div>

              <div className='article-container'>
                <div className='article-body'>
                  <img
                    src={
                      article.post_image.includes('http://127.0.0.1:8000')
                        ? article.post_image
                        : `http://127.0.0.1:8000${article.post_image}`
                    }
                    alt=''
                  />

                  <p
                    dangerouslySetInnerHTML={{ __html: article.post_text }}
                  ></p>

                  <div className='tags'>
                    <h3>Tags</h3>
                    {matchingTags
                      ? matchingTags.map((tag, index) => (
                          <p key={index} className='tag'>
                            {tag}
                          </p>
                        ))
                      : ''}
                  </div>

                  <h3 ref={commentsRef} className='comments-title'>
                    Comments {`(${commentsLength})`}
                  </h3>

                  <Comments
                    token={token}
                    id={id}
                    userId={userId}
                    userData={userData}
                    handleCommentsLength={handleCommentsLength}
                    handleAlertMessage={handleAlertMessage}
                    showLoginWindow={showLoginWindow}
                    renderProfileImages={renderProfileImages}
                    getImageSrc={getImageSrc}
                  />

                  <span>
                    <button onClick={navigateBackToTop} className='back-to-top'>
                      Back to Top
                    </button>
                  </span>
                </div>

                <div className='author-details'>
                  <Link
                    to={
                      userId === userSubscribeId
                        ? `/Profile`
                        : `/User/${userSubscribeId}`
                    }
                  >
                    <div className='image-container'>
                      {renderProfileImages(article.post_author.user_image)}
                    </div>
                  </Link>

                  <div>
                    <div className='author'>
                      <h3>{article.post_author.username}</h3>

                      <p className='date-and-time'>
                        {article.post_created_date
                          .substring(0, 16)
                          .replace(/T/, ', ')}
                      </p>

                      {username !== article.post_author.username ? (
                        <button
                          onClick={() => {
                            {
                              subscribedUsers.includes(
                                article.post_author.username
                              )
                                ? unsubscribeFromUser(userSubscribeId)
                                : subscribeToUser(userSubscribeId);
                            }
                          }}
                          className={
                            subscribedUsers.includes(
                              article.post_author.username
                            )
                              ? 'new-post subscribed'
                              : 'new-post'
                          }
                        >
                          {subscribedUsers.includes(
                            article.post_author.username
                          )
                            ? ''
                            : 'Subscribe'}
                        </button>
                      ) : (
                        ''
                      )}
                    </div>

                    <span>
                      <p title={`${article.post_views} have viewed this post so far`}>
                        <Eye style={{ margin: '0px 6px' }} />
                        {article.post_views}
                      </p>

                      <p onClick={likeCurrentPost} title='Click to Like this post'>
                        <Heart style={{ margin: '0px 6px' }} />{' '}
                        {article.post_likes.length}
                      </p>

                      <p onClick={scrollToComments} title='Click to see comments'>
                        <Chat style={{ margin: '0px 6px' }} />
                        {commentsLength}
                      </p>
                    </span>

                    {username === article.post_author.username ? (
                      <div className='post-options'>
                        <button onClick={deletePost} className='delete'>
                          Delete Post
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))
        : ''}
    </>
  );
}

export default Article