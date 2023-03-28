import { React, useState, useEffect } from 'react'
import SortingOptions from '../components/SortingOptions'
import SortingToggleButton from '../components/SortingToggleButton'
import { Link } from 'react-router-dom'

function Subscriptions({
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
  loginToken,
  handleAlertMessage,
  fetchUserList,
  userId,
}) {
    
  const [sortingToggle, setSortingToggle] = useState(false);
  const toggleSortingOptions = () => setSortingToggle(!sortingToggle);

  useEffect(() => {
    fetchUserList();
    window.scrollTo(0, 0);
  }, []);

  const handleUnsubscribe = (e) => {
    const user = parseInt(e.currentTarget.parentElement.parentElement.id);

    if (user) {
      unsubscribeFromUser(user);
    } else {
      handleAlertMessage("Error: There was an problem while unsubscribing you");
    }
  };

  return (
    <section className="main-content">
      <div className="columns">
        <div className="left-column">
          <header className="blogs">
            <h1>Subscriptions</h1>
            <SortingToggleButton
              sortingToggle={sortingToggle}
              toggleSortingOptions={toggleSortingOptions}
            />
          </header>

          <div className="posts-container">
            {(() => {
              if (loginToken) {
                if (users && users.length === 0) {
                  return <h3>No subscriptions yet...</h3>;
                } else {
                  return (
                    <>
                      {users ? users.map((user) => (
                        <article className="user" key={user.id} id={user.id}>
                            <span>
                                <div className="image-container">
                                    {renderProfileImages(user.user_image)}
                                </div>
                                <h1>{user.username}</h1>
                            </span>

                            <span>
                                <Link key={user.id} to={userId === user.id
                                    ? `/Profile` : `/User/${user.id}`
                                    }>

                                    <button className="new-post">Visit Profile</button>
                                </Link>

                                <button onClick={handleUnsubscribe} className="unsubscribe">
                                    Unsubscribe
                                </button>
                            </span>
                        </article> )) : ''}
                    </>
                  )
                }
              } else {
                return <h3>Login to view subscriptions</h3>;
              }
            })()}
          </div>
        </div>

        <div className={sortingToggle ? "right-column" : "right-column hidden"}>
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
  )
}

export default Subscriptions