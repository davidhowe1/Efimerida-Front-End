import React from 'react'
import { BoxArrowRight, BoxArrowLeft, Code, Newspaper, Pencil, MoonFill, Tools, X, SunFill, PersonFillAdd } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar'

function MobileMenu({ handleTabClick, activeTab, setPosts, handleLogout, 
    hideMobileMenu, mobileMenu, toggleTheme, theme, isLoggedIn, showLoginWindow, 
    showSignUpWindow}) {
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
            <Link onClick={() => handleTabClick('All')} to='/All'>
            <li className={activeTab === 'All' ? 'active' : ''}>
                <Newspaper /> All Blogs
            </li>
            </Link>

            <Link onClick={() => handleTabClick('Development')} to='/Development'>
            <li className={activeTab === 'Development' ? 'active' : ''}>
                <Code /> Development
            </li>
            </Link>

            <Link onClick={() => handleTabClick('Admin')} to='/Admin'>
            <li className={activeTab === 'Admin' ? 'active' : ''}>
                <Tools /> Admin
            </li>
            </Link>

            <Link onClick={() => handleTabClick('Design')} to='/Design'>
            <li className={activeTab === 'Design' ? 'active' : ''}>
                <Pencil /> Design
            </li>
            </Link>
        </ul>

        <ul>
            {isLoggedIn ? <li onClick={handleLogout}>
                <BoxArrowLeft /> Logout
            </li> :
            <>
                <li onClick={showLoginWindow}>
                    <BoxArrowRight /> Login
                </li>

                <li onClick={showSignUpWindow}>
                    <PersonFillAdd /> Sign Up
                </li>
            </>
            }

            <li onClick={toggleTheme}>
                {theme === 'light' ? 
                <><MoonFill /> Dark Mode</> : <><SunFill /> Light Mode</>}
            </li>
        </ul>
    </div>
  )
}

export default MobileMenu