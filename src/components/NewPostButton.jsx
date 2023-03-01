import React from 'react'
import { Plus } from 'react-bootstrap-icons'

function NewPostButton({ showNewPostForm }) {
  return (
    <button onClick={showNewPostForm} className='new-post'>New Post 
      <Plus style={{height: '15px', width: '15px', margin: '0px 0px 0px 5px'}} />
    </button>
  )
}

export default NewPostButton