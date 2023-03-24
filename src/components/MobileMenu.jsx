import React from 'react'
import { BoxArrowRight, BoxArrowLeft, Code, Newspaper, Pencil, MoonFill, Tools, X, SunFill, PersonFillAdd, PersonGear } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar'

function MobileMenu({ activeTab, setPosts, handleLogout, 
    hideMobileMenu, mobileMenu, toggleTheme, theme, isLoggedIn, showLoginWindow, 
    showSignUpWindow, username }) {
  return (
    <div className='menu'>
        <header>
            <h1>Menu</h1>
            <X onClick={hideMobileMenu} style={{height: '40px', width: '40px'}}/>
        </header>

        <div className='search'>
            <Searchbar 
              setPosts={setPosts}
              hideMobileMenu={hideMobileMenu}
              mobileMenu={mobileMenu}
            />
        </div>
        
        <ul>
            <Link to='/All'>
            <li className={activeTab === '/All' ? 'active' : ''}>
                <Newspaper /> All Blogs
            </li>
            </Link>

            <Link to='/Development'>
            <li className={activeTab === '/Development' ? 'active' : ''}>
                <Code /> Development
            </li>
            </Link>

            <Link to='/Admin'>
            <li className={activeTab === '/Admin' ? 'active' : ''}>
                <Tools /> Admin
            </li>
            </Link>

            <Link to='/Design'>
            <li className={activeTab === '/Design' ? 'active' : ''}>
                <Pencil /> Design
            </li>
            </Link>
        </ul>

        <ul>

            {username ? <h3>Hello {username} 👋</h3> : ' '}

            <li onClick={toggleTheme}>
                {theme === 'light' ? 
                <><MoonFill /> Dark Mode</> : <><SunFill /> Light Mode</>}
            </li>

            {isLoggedIn ? 
            
            <>
                <Link to='/Profile'>
                    <li onClick={hideMobileMenu}>
                        <PersonGear /> Profile
                    </li>
                </Link>

                <li onClick={handleLogout}>
                    <BoxArrowLeft /> Logout
                </li>
            </>
            :
            <>
                <li onClick={showLoginWindow}>
                    <BoxArrowRight /> Login
                </li>

                <li onClick={showSignUpWindow}>
                    <PersonFillAdd /> Sign Up
                </li>
            </>
            }
        </ul>
    </div>
  )
}

export default MobileMenu