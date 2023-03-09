import React, { useState } from 'react'
import { Search } from 'react-bootstrap-icons'

function Searchbar({ setPosts, hideMobileMenu }) {

  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchQuery = () => {
    fetch('http://127.0.0.1:8000/post/by_filter/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ post_title: searchQuery })
    })
    .then(response => response.json())
    .then(data => setPosts(data))
    .catch(err => console.error(err))
    setSearchQuery('')
    hideMobileMenu()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchQuery()
    }
  }

  return (
    <span className='search-bar-container'>
      <input 
      placeholder='Search Efimerida'
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      className='search-bar' 
      type="search" />

      <button onClick={handleSearchQuery} className='search'>
        <Search />
      </button>
    </span>
  )
}

export default Searchbar