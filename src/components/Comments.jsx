import { React, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'

function Comments({
  token,
  id,
  handleCommentsLength,
  handleAlertMessage,
  showLoginWindow,
  renderProfileImages,
  userData,
  userId,
  getImageSrc
}) {

  const [comment, setComment] = useState('')
  const [commentsList, setCommentsList] = useState([])
  const userImage = userData ? userData.user_image : ''

  const renderComments = async () => {
      try {
        const response = await fetch(`https://efimerida.herokuapp.com/post/comment/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
        const comments = data.results
        setCommentsList(comments)
        handleCommentsLength(comments.length)
      } catch {
        console.error(error)
      }
  }

  const postComment = async () => {
      if (token) {
          try {
            const response = await fetch(`https://efimerida.herokuapp.com/post/comment/${id}/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                  comment_post: parseInt(id),
                  comment_text: comment,
                }),
            })
            const data = await response.json()
            renderComments()
            handleAlertMessage('Comment posted.')
          } catch (error) {
            console.error(error)
          }
      } else { showLoginWindow() }
  }

  useEffect(() => {
    renderComments();
  }, []);

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
    <section className="comments">
      <div className="add-comment">
        <img src={getImageSrc(userImage)} alt="" />

        <textarea
          ref={textareaRef}
          placeholder="What do you think?"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          style={{ minHeight: minTextareaHeight, resize: "none" }}
        />
      </div>

      <div className="comment-button-container">
        <button onClick={postComment} className="new-post">
          Comment
        </button>
      </div>

      <ul>
        {commentsList
          ? commentsList.map((comment, index) => (
              <li key={index}>
                <div className="user-details">
                  <div className="image-container">
                    {renderProfileImages(comment.comment_author.user_image)}
                  </div>

                  <Link
                    to={
                      userId === comment.comment_author.id
                        ? `/Profile`
                        : `/User/${comment.comment_author.id}`
                    }
                  >
                    <h4>{comment.comment_author.username}</h4>
                  </Link>

                  <p>
                    {comment.comment_created_date
                      .substring(0, 16)
                      .replace(/T/, ", ")}
                  </p>
                </div>

                <p className="comment">{comment.comment_text}</p>
              </li>
            ))
          : "No Comments to Show"}
      </ul>
    </section>
  );
}

export default Comments