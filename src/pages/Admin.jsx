import React, { useEffect } from 'react'
import SortingOptions from '../components/SortingOptions'
import Posts from '../components/Posts'

function Admin({ showUsers, showContent, showListOfUsers, users, posts, 
  storePostContentForRender, showPost, setPosts, sortType, handleSortTypeChange }) {

    const fetchPosts = () => {
      fetch('http://127.0.0.1:8000/post/by_filter/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ post_tags: ["Admin"] })
      })
      .then(response => {return response.json()})
      .then(data => setPosts(data))
      .catch(err => console.error(err))
    }

    useEffect(() => {
      fetchPosts()
    }, [])
    
  return (
    <>
      <section className='main-content'>
        <div className='columns'>
          <div className='left-column'>
            <h1>Admin</h1>

            <div className='posts-container'>
              <Posts 
                showPost={showPost}
                posts={posts}
                showUsers={showUsers}
                users={users}
                storePostContentForRender={storePostContentForRender}
                />
              </div>
            </div>

          <div className='right-column'>
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

export default Admin