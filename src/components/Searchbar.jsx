import React, { useState, useEffect } from 'react'
import { Search } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'

function Searchbar({ setPosts, hideMobileMenu, mobileMenu }) {

  const [searchQuery, setSearchQuery] = useState('')
  const url = window.location.pathname
  const navigateToPosts = useNavigate()

  const handleSearchQuery = async () => {
    if (url !== '/All') {
      await navigateToPosts('/All')
    }
    await fetchSearchQuery()
  }
  
  const fetchSearchQuery = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/post/by_filter/?t=${Date.now()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_title: searchQuery })
      })
  
      const data = await response.json()
      setPosts(data)
  
      if (mobileMenu) {
        hideMobileMenu()
      }
    } catch (err) {
      console.error(err)
    }
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchQuery()
    }
  }

  useEffect(() => {
    fetchSearchQuery();
  }, []);

  return (
    <span className='search-bar-container'>
      <input 
      placeholder='Try Design, Post or Data...'
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