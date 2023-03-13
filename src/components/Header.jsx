import { React } from 'react'
import { List, MoonFill, SunFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import NewPostButton from './NewPostButton'
import Searchbar from './Searchbar'

function header({ showLoginWindow, showSignUpWindow, isLoggedIn, handleLogout, 
  activeTab, handleTabClick, showNewPostForm, setPosts, mobileMenu, showMobileMenu,
  hideMobileMenu, toggleTheme, theme, loginToken }) {

  return (
    <>
      <div className='header-wrapper'>
        <header>
          <Link to='/Home'>
            <h2>Efimerida</h2>
          </Link>

          <div className='login-buttons'>
            {isLoggedIn ? 
              <>
                <button onClick={toggleTheme} className='theme'>
                  {theme === 'light' ? <MoonFill /> : <SunFill />}
                </button>
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

          {isLoggedIn ? <div onClick={showMobileMenu} className='mobile-menu-toggle'>
              <List />
          </div> : ''}

        </header>
      </div>

      {isLoggedIn ? <div className={mobileMenu ? 'mobile-menu' : 'mobile-menu hidden'}>
        <MobileMenu 
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          setPosts={setPosts}
          showNewPostForm={showNewPostForm}
          handleLogout={handleLogout}
          hideMobileMenu={hideMobileMenu}
          toggleTheme={toggleTheme}
          theme={theme}
          mobileMenu={mobileMenu}
        />
      </div> : ''}

      <div className='nav-wrapper'>
        <nav>
          <div>
            <ul>
              <Link onClick={() => handleTabClick('All')} to='/All'>
                <li className={activeTab === 'All' ? 'active' : ''}>
                  All Blogs
                </li>
              </Link>

              <Link onClick={() => handleTabClick('Development')} to='/Development'>
                <li className={activeTab === 'Development' ? 'active' : ''}>
                  Development
                </li>
              </Link>

              <Link onClick={() => handleTabClick('Admin')} to='/Admin'>
                <li className={activeTab === 'Admin' ? 'active' : ''}>
                  Admin
                </li>
              </Link>

              <Link onClick={() => handleTabClick('Design')} to='/Design'>
                <li className={activeTab === 'Design' ? 'active' : ''}>
                  Design
                </li>
              </Link>
            </ul>
          </div>

          <div className='search'>
            <Searchbar 
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