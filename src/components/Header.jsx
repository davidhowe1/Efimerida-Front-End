import { React } from 'react'
import { List, MoonFill, SunFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import NewPostButton from './NewPostButton'
import Searchbar from './Searchbar'

function header({ showLoginWindow, showSignUpWindow, isLoggedIn, handleLogout, 
  activeTab, handleTabClick, showNewPostForm, setPosts, mobileMenu, showMobileMenu,
  hideMobileMenu, toggleTheme, theme, loginToken, userData }) {

    const username = userData ? userData.username : ''
    const userImage = userData ? userData.user_image : ''

    const mobileMenuProps = {
      username,
      handleTabClick,
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
    }

  return (
    <>
      <div className='header-wrapper'>
        <header>
          <Link to={loginToken ? '/All' : ''}>
            <h2>Efimerida</h2>
          </Link>

          <div className='login-buttons'>
            {isLoggedIn ? 
              <>
                <button onClick={toggleTheme} className='theme'>
                  {theme === 'light' ? <MoonFill /> : <SunFill />}
                </button>

                  <Link to='/Profile'>
                    <button className='profile'>
                      <p>{username}</p>
                      <img src={userImage.includes('http://127.0.0.1:8000/images/') ? `${userImage}`
                        : `http://127.0.0.1:8000/images/${userImage}`} alt="" />
                    </button>
                  </Link>
                <button onClick={handleLogout} className='login'>Logout</button>
              </> 
              : 
              <>
                <button onClick={toggleTheme} className='theme'>
                  {theme === 'light' ? <MoonFill /> : <SunFill />}</button>
                <button onClick={showLoginWindow} className='login'>Login</button>
                <button onClick={showSignUpWindow} className='sign-up'>Sign Up</button>
              </>
              }
          </div>

          <div onClick={showMobileMenu} className='mobile-menu-toggle'>
            <List />
          </div>

        </header>
      </div>

      <div className={mobileMenu ? 'mobile-menu' : 'mobile-menu hidden'}>
        <MobileMenu 
          {...mobileMenuProps}
        />
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

          <div className='search'>
            <Searchbar 
              {...mobileMenuProps}
              setPosts={setPosts}
              mobileMenu={mobileMenu}
            />
          </div>

          {loginToken ? 
          <NewPostButton
          /> : ''}
          
        </nav>
      </div>
    </>
  )
}

export default header