import { React } from 'react'
import { Link } from 'react-router-dom'
import NewPostButton from './NewPostButton'
import Searchbar from './Searchbar'

function header({ showLoginWindow, showSignUpWindow, isLoggedIn, handLogout, 
  activeTab, handleTabClick, showNewPostForm, setPosts }) {

  return (
    <>
      <header>
        <h2>Efimerida</h2>
        <div className='login-buttons'>
          {isLoggedIn ? 
            <button onClick={handLogout} className='login'>Logout</button> : 
            <>
              <button onClick={showLoginWindow} className='login'>Login</button>
              <button onClick={showSignUpWindow} className='sign-up'>Sign Up</button>
            </>
            }
        </div>
      </header>

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

          <div>
            <NewPostButton 
              showNewPostForm={showNewPostForm}
            />
          </div>
        </nav> : ''}
    </>
  )
}

export default header