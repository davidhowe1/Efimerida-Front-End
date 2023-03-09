import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PencilSquare } from 'react-bootstrap-icons'

function NewPostButtonMobile() {
    
    const { pathname } = useLocation()
    
    if (pathname === '/New-Post') {
        return null
    }

  return (
    <div className='new-post-button-mobile'>
        <Link to='/New-Post'>
            <PencilSquare style={{height: '25px', width: '25px'}}/>
        </Link>
    </div>
  )
}

export default NewPostButtonMobile