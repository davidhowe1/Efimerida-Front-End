import { React } from 'react'
import { List, MoonFill, SunFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import NewPostButton from './NewPostButton'
import Searchbar from './Searchbar'

function header({
  showLoginWindow,
  showSignUpWindow,
  isLoggedIn,
  handleLogout,
  activeTab,
  handleTabChange,
  showNewPostForm,
  setPosts,
  mobileMenu,
  showMobileMenu,
  hideMobileMenu,
  toggleTheme,
  theme,
  loginToken,
  userData,
  getImageSrc
}) {
	
  const username = userData ? userData.username : ''
  const userImage = userData ? userData.user_image : ''
  
  const mobileMenuProps = {
    username,
    handleTabChange,
    activeTab,
    setPosts,
    showNewPostForm,
    handleLogout,
    hideMobileMenu,
    toggleTheme,
    theme,
    mobileMenu,
    isLoggedIn,
    showLoginWindow,
    showSignUpWindow,
  };

  return (
    <>
      <div className='header-wrapper'>
        <header>
          <Link to={loginToken ? '/All' : ''}>
            <h3>Efimerida</h3>
          </Link>

          <div className='login-buttons'>
            {isLoggedIn ? (
              <>
                <button onClick={toggleTheme} className='theme' alt='Toggle theme'>
                  {theme === 'light' ? <MoonFill /> : <SunFill />}
                </button>

                <Link to='/Profile'>
                  <button className='profile'>
                    <p>{username}</p>

                    <div className='user-picture'>
                      <img src={getImageSrc(userImage)}
                      alt='Link to user profile'
                      />
                    </div>
                  </button>
                </Link>

                <button onClick={handleLogout} className='login'>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={toggleTheme} className='theme' alt='Toggle Theme'>
                  {theme === 'light' ? <MoonFill /> : <SunFill />}
                </button>

                <button onClick={showLoginWindow} className='login'>
                  Login
                </button>

                <button onClick={showSignUpWindow} className='sign-up'>
                  Sign Up
                </button>
              </>
            )}
          </div>

          <div onClick={showMobileMenu} className='mobile-menu-toggle'>
            <List />
          </div>
          
        </header>
      </div>

      <div className={mobileMenu ? 'mobile-menu' : 'mobile-menu hidden'}>
        <MobileMenu {...mobileMenuProps} />
      </div>

      <div className='nav-wrapper'>
        <nav>
          <div>
            <ul>
              <Link to='/All'>
                <li className={activeTab === '/All' ? 'active' : ''}>
                  All Posts
                </li>
              </Link>

              <Link to='/Development'>
                <li className={activeTab === '/Development' ? 'active' : ''}>
                  Development
                </li>
              </Link>

              <Link to='/Admin'>
                <li className={activeTab === '/Admin' ? 'active' : ''}>
                  Admin
                </li>
              </Link>

              <Link to='/Design'>
                <li className={activeTab === '/Design' ? 'active' : ''}>
                  Design
                </li>
              </Link>
            </ul>
          </div>

          <div className='search' alt='Search'>
            <Searchbar
              {...mobileMenuProps}
              setPosts={setPosts}
              mobileMenu={mobileMenu}
            />
          </div>

          {loginToken ? <NewPostButton /> : ''}
        </nav>
      </div>
    </>
  );
}

export default header