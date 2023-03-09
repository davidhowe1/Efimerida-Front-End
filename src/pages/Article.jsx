import { React, useState, useEffect, useRef } from 'react'
import { Chat, ChevronLeft, Eye, Heart } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Comments from '../components/Comments'
import { useParams } from 'react-router-dom'

function Article({ fetchTagData, tags, handleAlertMessage }) {
    
    const [content, setContent] = useState([])
    const { id } = useParams();
    const token = localStorage.getItem('token')

    const [commentsLength, setCommentsLength] = useState(0)
    const handleCommentsLength = (length) => setCommentsLength(length)

    const commentsRef = useRef()
    const scrollToComments = () => {
        commentsRef.current.scrollIntoView({
            behavior: "auto",
            block: "center",
            inline: "center"
        })
    }
    const navigateBackToTop = () => window.scrollTo(0, 0)

    const renderPostContent = () => {
        fetch(`http://127.0.0.1:8000/post/detail/${id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => setContent([data]))
            .catch(error => console.log('Error: ', error))
        }

    const likeCurrentPost = () => {
        fetch(`http://127.0.0.1:8000/post/like/${id}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                }
            })
            .then(response => {
                if (response.ok) {
                    renderPostContent()
                    handleAlertMessage('You liked this post.')
                }
                return response.json()
            })
            .catch(error => console.log('Error: ', error))
        }

    useEffect(() => {
        renderPostContent()
        fetchTagData();
        window.scrollTo(0, 0)
    }, [])

    let postTags;

    if (content.length > 0) {
        postTags = content[0].post_tags
    } else {
        return postTags
    }

    const matchingTags = postTags.map(num => {
        const postTags = tags.find(tag => tag.id === num);
        return postTags ? postTags.tag_name : null;
    });

    const previousContentTab = localStorage.getItem('content-tab')

  return (
    <>
        {content ? content.map(article => (
            <article key={article.id} className='post'>
                <div className='close-button'> 
                    <h1>{article.post_title}</h1>
                    <Link to={`/${previousContentTab}`}>
                        <span>
                            <ChevronLeft
                            style={{height: '20px', width: '20px', padding: '0px 5px'}} />
                            <p>{`Back to ${previousContentTab}`}</p>
                        </span>
                    </Link>
                </div>

                <div className='article-container'>
                    <div className='article-body'>
                        <img src={article.post_image.includes('http://127.0.0.1:8000') ? 
                        article.post_image : `http://127.0.0.1:8000${article.post_image}`} alt="" />
                        <p dangerouslySetInnerHTML={{__html: article.post_text}}></p>

                        <h3 
                        ref={commentsRef} 
                        className='comments-title'>Comments {`(${commentsLength})`}
                        </h3>

                        <Comments
                        token={token}
                        id={id}
                        handleCommentsLength={handleCommentsLength}
                        handleAlertMessage={handleAlertMessage}
                        />
                        
                        <span>
                            <button onClick={navigateBackToTop} className='back-to-top'>Back to Top</button>
                        </span>
                    </div>

                    <div className='author-details'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt=""/>

                        <div>
                            <h3>{article.post_author.username}</h3>
                            <p className='date-and-time'>{article.post_created_date.substring(0, 16).replace(/T/, ', ')}</p>

                            <span>
                                <p title={`${article.post_views} have viewed this post so far`}>
                                    <Eye style={{margin: '0px 6px'}} />{article.post_views}
                                </p>

                                <p onClick={likeCurrentPost} title="Click to Like this post">
                                    <Heart style={{margin: '0px 6px'}}/> {article.post_likes.length}
                                </p>

                                <p onClick={scrollToComments} title="Click to see comments">
                                    <Chat style={{margin: '0px 6px'}}/>{commentsLength}
                                </p>
                            </span>

                            <h3 className='tags'>Tags</h3>
                            
                            {matchingTags ? matchingTags.map((tag, index) => (
                                <p key={index} className='tag'>{tag}</p>
                            )) : ''}
                        </div>
                    </div>
                </div>
            </article>
        )) : ' '}
    </>
  )
}

export default Article