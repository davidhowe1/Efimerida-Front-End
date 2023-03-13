import { React } from 'react'
import { List, MoonFill, SunFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import NewPostButton from './NewPostButton'
import Searchbar from './Searchbar'

function header({ showLoginWindow, showSignUpWindow, isLoggedIn, handleLogout, 
  activeTab, handleTabClick, showNewPostForm, setPosts, mobileMenu, showMobileMenu,
  hideMobileMenu, toggleTheme, theme, loginToken }) {

    const mobileMenuProps = {
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
          <Link onClick={() => handleTabClick('All')} to={loginToken ? '/All' : ''}>
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