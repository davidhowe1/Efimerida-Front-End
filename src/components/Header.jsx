import { React } from 'react'
import { List, MoonFill, SunFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import NewPostButton from './NewPostButton'
import Searchbar from './Searchbar'

function header({ showLoginWindow, showSignUpWindow, isLoggedIn, handLogout, 
  activeTab, handleTabClick, showNewPostForm, setPosts, mobileMenu, showMobileMenu,
  hideMobileMenu, toggleTheme, theme }) {

  return (
    <>
      <header>
        <h2>Efimerida</h2>
        <div className='login-buttons'>
          {isLoggedIn ? 
            <>
              <button onClick={toggleTheme} className='theme'>
                {theme === 'light' ? <MoonFill /> : <SunFill />}
              </button>
              <button onClick={handLogout} className='login'>Logout</button>
            </> 
            : 
            <>
              <button onClick={showLoginWindow} className='login'>Login</button>
              <button onClick={showSignUpWindow} className='sign-up'>Sign Up</button>
            </>
            }
        </div>

        {isLoggedIn ? <div onClick={showMobileMenu} className='mobile-menu-toggle'>
            <List />
        </div> : ''}

      </header>

      {isLoggedIn ? <div className={mobileMenu ? 'mobile-menu' : 'mobile-menu hidden'}>
        <MobileMenu 
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          setPosts={setPosts}
          showNewPostForm={showNewPostForm}
          handLogout={handLogout}
          hideMobileMenu={hideMobileMenu}
          toggleTheme={toggleTheme}
          theme={theme}
        />
      </div> : ''}

      {isLoggedIn ? 
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
            />
          </div>

          <NewPostButton />
        </nav> : ''}
    </>
  )
}

export default header