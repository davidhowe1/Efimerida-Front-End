import React, { useEffect, useState } from 'react'
import SortingOptions from '../components/SortingOptions'
import Posts from '../components/Posts'
import SortingToggleButton from '../components/SortingToggleButton'

function Design({ showUsers, showContent, setPosts, showListOfUsers, users,
  posts, sortType, handleSortTypeChange }) {

    const fetchPosts = () => {
      fetch('http://127.0.0.1:8000/post/by_filter/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ post_tags: ["Design"] })
      })
      .then(response => {return response.json()})
      .then(data => setPosts(data))
      .catch(err => console.error(err))
    }

    useEffect(() => {
      fetchPosts()
    }, [])

    const [sortingToggle, setSortingToggle] = useState(false)
    const toggleSortingOptions = () => setSortingToggle(!sortingToggle)
    
  return (
    <>
      <section className='main-content'>
        <div className='columns'>
          <div className='left-column'>
            <header className='blogs'>
              <h1>Design</h1>
              <SortingToggleButton
                sortingToggle={sortingToggle}
                toggleSortingOptions={toggleSortingOptions}
              />
            </header>

            <div className='posts-container'>
              <Posts 
                posts={posts}
                showUsers={showUsers}
                users={users}
                />
              </div>
            </div>

            <div className={sortingToggle ? 'right-column' : 'right-column hidden'}>
            <SortingOptions 
              posts={posts}
              setPosts={setPosts}
              showUsers={showUsers}
              showContent={showContent}
              showListOfUsers={showListOfUsers}
              sortType={sortType}
              handleSortTypeChange={handleSortTypeChange}
            />
          </div>
        </div>

      </section>
    </>
  )
}

export default Design