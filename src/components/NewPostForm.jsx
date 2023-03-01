import React from 'react'
import { useState, useEffect } from 'react';
import { InfoSquareFill, X } from 'react-bootstrap-icons'

function NewPostForm({ hideNewPostForm }) {

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([])

  const tagData = [
    { id: 4, tag_name: 'Admin' },
    { id: 5, tag_name: 'Design' },
    { id: 2, tag_name: 'Development' },
    { id: 6, tag_name: 'Management' },
    { id: 3, tag_name: 'Marketing' },
    { id: 1, tag_name: 'gfas' },
  ];
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleTagClick = (tagId) => {
    if (tags.includes(tagId)) {
      setTags(tags.filter((id) => id !== tagId));
    } else {
      setTags([...tags, tagId]);
    }
  }

  const token = localStorage.getItem('token')

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('post_title', title)
    formData.append('post_text', text)
    formData.append('post_image', image)
    formData.append('post_tags', parseInt(tags))

    fetch('http://127.0.0.1:8000/post/list/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {console.log('New post created: ', data)})
    .catch(error => console.log('Error creating post: ', error))
    hideNewPostForm()
  }

  const addParagraphTags = () => setText(`${text}<p>Text</p>\n`)
  const addTitleTags = () => setText(`${text}<h1>Title</h1>\n`)
  const addLineBreakTags = () => setText(`${text}<br>\n`)


  return (
    <section className='new-post-form-container'>
      <form onSubmit={handleSubmit}>
        <div className='form-header'>
          <h1>New Post</h1>
          <X onClick={hideNewPostForm} style={{height: '40px', width: '40px', cursor: 'pointer'}}/>
        </div>

        <label><h4>Post Title</h4></label>
        <input type='text' value={title} onChange={handleTitleChange} />

        <label><h4>Post Image</h4></label>
        <input type='file' onChange={handleImageChange} />

        <label><h4>Post Text</h4></label>
        <span className='formatting-buttons'>
          <p title='Click the buttons to the right to add HTML formatting tags to your post'>
            Formatting 
            <InfoSquareFill style={{height: '20px', width: '20px', margin: '0px 0px 0px 10px'}}/>
          </p>

          <div>
            <button onClick={addTitleTags} type='button'>Add Title</button>
            <button onClick={addParagraphTags} type='button'>Add Paragraph</button>
            <button onClick={addLineBreakTags} type='button'>Add Line Break</button>
          </div>
        </span>
        <textarea value={text} onChange={handleTextChange} />

        <label><h4>Post Tags</h4></label>
          <div>
            {tagData.map((tag) => (
              <button
                key={tag.id}
                type='button'
                onClick={() => handleTagClick(tag.id)}
                style={{
                  margin: '0px 5px 0px 0px',
                  border: tags.includes(tag.id) ? '1px solid transparent' : '1px solid #8e94ff',
                  backgroundColor: tags.includes(tag.id) ? '#666eff' : 'white',
                  color: tags.includes(tag.id) ? 'white' : '#8e94ff',
                }}>
                {tag.tag_name}
              </button>
            ))}
          </div>
        
        <button type='submit'>Submit</button>
      </form>
    </section>
  );
}

export default NewPostForm