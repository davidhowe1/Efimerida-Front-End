import React from 'react'
import { Search, X } from 'react-bootstrap-icons'

function ToggleSearchBarButton({ toggleSearch, toggleSearchBarMobile }) {
  return (
    <div onClick={toggleSearchBarMobile} className='toggle-search'>
        {!toggleSearch ? <Search /> : <X style={{height: '25px', width: '25px'}}/>}
    </div>
  )
}

export default ToggleSearchBarButton