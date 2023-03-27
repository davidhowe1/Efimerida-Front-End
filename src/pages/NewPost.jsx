import React from 'react'
import { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom'

function NewPost({ handleAlertMessage, loginToken }) {

  const navigateToAllPosts = useNavigate()
  const url = window.location.pathname
  if (url === '/New-Post' && !loginToken) {
    navigateToAllPosts('/All')
  }

  const theme = localStorage.getItem('theme')
  const editorRef = useRef(null);

  const [title, setTitle] = useState('');
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
    formData.append('post_text', editorRef.current.getContent())
    formData.append('post_image', image)
    formData.append('post_tags', parseInt(tags))

    fetch('http://127.0.0.1:8000/post/list/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
      },
      body: formData
    })
    .then(response => {
      if (response.ok) {
          return response.json()
      } else {
        handleAlertMessage('Error: There was a problem creating your post. Try again later.')
        return response.json()
      }
    })
    .then(data => {
      const requiredProps = ['post_title', 'post_text', 'post_image', 'post_tags']
      const isAllPropsPresent = requiredProps.every(prop => data.hasOwnProperty(prop))
        
      if (isAllPropsPresent) {
        handleAlertMessage(`Your post '${data.post_title}' has been created!`)
        navigateToAllPosts('/All')
      } else {
        handleAlertMessage('Error: There was a problem creating your post. Please make sure all fields are filled before submitting.')
      }
    })
    .catch(error => {
      handleAlertMessage('Error: There was a problem creating your post. Try again later.')
      console.log('Error creating post: ', error)
    })
  }

  const cancelPost = (e) => {
    e.preventDefault()
    if (confirm('Are you sure you want to cancel this post?') == true) {
      navigateToAllPosts('/All')
    }
  }

  return (
	<section className='new-post-form-container'>
		{<form onSubmit={handleSubmit}>
			<div className='form-header'>
				<h1>New Post</h1>
			</div>

			<label><h4>Post Title</h4></label>
			<input type='text' value={title} onChange={handleTitleChange} />

			<label><h4>Post Image</h4></label>
			<input type='file' onChange={handleImageChange} />

			<label><h4>Post Text</h4></label>

			<Editor
			apiKey='30x0pv2r288ceylll8uxscndpcqpntp1bkd20dubo9ekg1qu'
			onInit={(evt, editor) => editorRef.current = editor}
			initialValue="<p>Write your text here.</p>"
			init={{
				height: 500,
				menubar: false,
				plugins: [
				'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
				'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
				'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
				],
				toolbar: 'undo redo | blocks | ' +
				'bold italic | alignleft aligncenter ' +
				'alignright alignjustify | bullist numlist outdent indent | ' +
				'removeformat | help',
				content_style: `body { 
				font-family:Helvetica,sans-serif;
				font-size:14px;
				color: unset;
				`
			}}
			/>

			<label><h4>Post Tags</h4></label>
			
			<div>
				{tagData.map((tag) => (
				<button
					key={tag.id}
					type='button'
					onClick={() => handleTagClick(tag.id)}
					style={{
					margin: '0px 5px 5px 0px',
					border: tags.includes(tag.id) ? '1px solid transparent' : '1px solid #8e94ff',
					backgroundColor: tags.includes(tag.id) ? '#666eff' : 'transparent',
					color: tags.includes(tag.id) ? 'white' : '#8e94ff',
					}}>
					{tag.tag_name}
				</button>
				))}
			</div>

			<div className='button-container'>
				<button onClick={cancelPost} className='cancel'>Cancel</button>
				<button type='submit'>Submit</button>
			</div>
		</form>}
	</section>
	);
}

export default NewPost