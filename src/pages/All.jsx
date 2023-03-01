import { React, useEffect } from 'react'
import SortingOptions from '../components/SortingOptions'
import Posts from '../components/Posts'

function All({ options, fetchPosts, showUsers, showContent, setPosts, showListOfUsers, users, posts, 
  storePostContentForRender, showPost, sortType, handleSortTypeChange }) {

    useEffect(() => {
      fetchPosts(options)
    }, [])

  return (
    <>
      <section className='main-content'>
        <div className='columns'>
          <div className='left-column'>
            <h1>All Blogs</h1>

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

export default All