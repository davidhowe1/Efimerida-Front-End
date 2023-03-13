import { React } from 'react'
import { PencilSquare } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

function NewPostButton() {
  return (
    <Link to='/New-Post'>
      <button className='new-post'>Write
        <PencilSquare style={{height: '15px', width: '15px', margin: '0px 0px 0px 5px'}} />
      </button>
    </Link>
  )
}

export default NewPostButton