import { React, useEffect, useState, useRef, useLayoutEffect } from 'react'

function Comments({ token, id, handleCommentsLength, 
    handleAlertMessage, showLoginWindow, renderProfileImages, userData }) {

    const [comment, setComment] = useState('')
    const [commentsList, setCommentsList] = useState([])
    const userImage = userData ? userData.user_image : ''

    const renderComments = () => {
        fetch(`http://127.0.0.1:8000/post/comment/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            const comments = data.results
            setCommentsList(comments)
            handleCommentsLength(comments.length)
        })
        .catch(error => console.log('Error: ', error))
    }

    const postComment = () => {
        if (token) {
            fetch(`http://127.0.0.1:8000/post/comment/${id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    'comment_post': parseInt(id),
                    'comment_text': comment,
                })
            })
            .then(response => {
                response.json()
                renderComments()
                handleAlertMessage('Comment posted.')
            })
            .catch(error => console.log('Error: ', error))
            setComment('')
        } else {
            showLoginWindow()
        }
    }

    useEffect(() => {
        renderComments()
    }, [])

    const textareaRef = useRef(null);
    const minTextareaHeight = 22;

    useLayoutEffect(() => {
        textareaRef.current.style.height = "inherit";
        textareaRef.current.style.height = `${Math.max(
          textareaRef.current.scrollHeight,
          minTextareaHeight
        )}px`;
      }, [comment]);    

  return (
    <section className='comments'>
        <div className='add-comment'>
            <img src={userImage.includes('http://127.0.0.1:8000') ? `${userImage}` : 
                `http://127.0.0.1:8000/images/${userImage}`
                } alt="" />
            <textarea 
                ref={textareaRef}
                placeholder='What do you think?'
                value={comment} 
                onChange={(e) => {setComment(e.target.value)}}
                style={{minHeight: minTextareaHeight, resize: 'none'}}/>
        </div>
       
        <div className='comment-button-container'>
            <button onClick={postComment} className='new-post'>Comment</button>
        </div>
        
        <ul>
            {commentsList ? commentsList.map((comment, index) => (
                <li key={index}>
                <div className='user-details'>
                    <div className='image-container'>{renderProfileImages(comment.comment_author.user_image)}</div>
                    <h4>{comment.comment_author.username}</h4>
                    <p>{comment.comment_created_date.substring(0, 16).replace(/T/, ', ')}</p>
                </div>
    
                <p className='comment'>{comment.comment_text}</p>
            </li>
            ))
             : 'No Comments to Show'}
        </ul>
    </section>
  )
}

export default Comments