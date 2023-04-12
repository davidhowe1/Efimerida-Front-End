import React, { useEffect, useState } from 'react'
import SortingOptions from '../components/SortingOptions'
import Posts from '../components/Posts'
import SortingToggleButton from '../components/SortingToggleButton'

function Development({
  showUsers,
  showContent,
  setPosts,
  showListOfUsers,
  users,
  posts,
  sortType,
  handleSortTypeChange,
  renderProfileImages,
  unsubscribeFromUser,
  setShowUsers,
  loginToken,
}) {
  
  const fetchPosts = async () => {
    try {
      const response = await fetch('https://efimerida.herokuapp.com/post/by_filter/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_tags: ["Development"] }),
      })
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const [sortingToggle, setSortingToggle] = useState(false);
  const toggleSortingOptions = () => setSortingToggle(!sortingToggle);

  return (
    <>
      <section className="main-content">
        <div className="columns">
          <div className="left-column">
            <header className="blogs">
              <h1>Development</h1>
              <SortingToggleButton
                sortingToggle={sortingToggle}
                toggleSortingOptions={toggleSortingOptions}
              />
            </header>

            <div className="posts-container">
              <Posts
                posts={posts}
                showUsers={showUsers}
                setShowUsers={setShowUsers}
                users={users}
                loginToken={loginToken}
                renderProfileImages={renderProfileImages}
                unsubscribeFromUser={unsubscribeFromUser}
              />
            </div>
          </div>

          <div
            className={sortingToggle ? "right-column" : "right-column hidden"}
          >
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
  );
}

export default Development