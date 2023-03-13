import { React, useState, useEffect } from 'react'
import SortingOptions from '../components/SortingOptions'
import Posts from '../components/Posts'
import SortingToggleButton from '../components/SortingToggleButton'

function All({ options, fetchPosts, showUsers, showContent, setPosts, showListOfUsers,
   users, posts, sortType, handleSortTypeChange }) {

    useEffect(() => {
      fetchPosts(options)
    }, [])

    const [sortingToggle, setSortingToggle] = useState(false)
    const toggleSortingOptions = () => setSortingToggle(!sortingToggle)

  return (
    <>
      <section className='main-content'>
        <div className='columns'>
          <div className='left-column'>
            <header className='blogs'>
              <h1>All Posts</h1>
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

export default All