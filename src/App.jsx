import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './App.css'
import './Tablet.css'
import './Mobile.css'
import Header from './components/Header';
import Login from './components/Login'
import SignUp from './components/SignUp';
import DimBackground from './components/DimBackground'
import Home from './pages/Home';
import All from './pages/All'
import Development from './pages/Development'
import Admin from './pages/Admin'
import Design from './pages/Design'
import Article from './pages/Article';
import AlertMessage from './components/AlertMessage';
import Footer from './components/Footer';
import NewPost from './pages/NewPost';
import NewPostButtonMobile from './components/NewPostButtonMobile';

function App() {

  const [login, setLogin] = useState(false)
  const showLoginWindow = () => {
    setLogin(true)
    hideSignUpWindow()
    hideMobileMenu()
  }
  const hideLoginWindow = () => setLogin(false)

  const loginToken = !!localStorage.getItem('token')
  const [isLoggedIn, setIsLoggedIn] = useState(loginToken)

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    hideMobileMenu()
    handleAlertMessage('Logged Out')
  }

  const [signUp, setSignUp] = useState(false)
  const showSignUpWindow = () => {
    setSignUp(true)
    hideLoginWindow()
    hideMobileMenu()
  }
  const hideSignUpWindow = () => setSignUp(false)
  const hideLoginOrSignUpWindow = () => {setLogin(false);setSignUp(false)}

  const [mobileMenu, setMobileMenu] = useState(false)
  const showMobileMenu = () => setMobileMenu(true)
  const hideMobileMenu = () => setMobileMenu(false)

  const [showUsers, setShowUsers] = useState(false)
  const showContent = () => setShowUsers(false)
  const showListOfUsers = () => setShowUsers(true)

  const [sortType, setSortType] = useState('latest')
  const handleSortTypeChange = (type) => {
    setSortType(type)
    scrollTo(0, 0)
  }

  const [alert, setAlert] = useState('')
  const [alertIsActive, setAlertIsActive] = useState(false)
  const timeoutIdRef = useRef(null)

  const handleAlertMessage = (message) => {
    setAlert(message)
    setAlertIsActive(true)

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }

    timeoutIdRef.current = setTimeout(() => {
      setAlertIsActive(false)
    }, 5000)
  }


  let [posts, setPosts] = useState([])
  let options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  }

  const fetchPosts = () => {
    fetch('http://127.0.0.1:8000/post/list/?format=json', options)
      .then(response => response.json())
      .then(data => setPosts(data.results))
      .catch(err => console.error(err))
  }

  const [users, setUsers] = useState([])

  const fetchUserList = () => {
    fetch('http://127.0.0.1:8000/user/list/?format=json', options)
      .then(response => response.json())
      .then(data => setUsers(data.results))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchUserList()
    setActiveTab(localStorage.getItem('content-tab'))
  }, [])

  const fetchTagData = () => {
    fetch('http://127.0.0.1:8000/post/tag_list/', options)
    .then(response => response.json())
    .then(data => setTags(data.results))
    .catch(err => console.error(err))
  } 

  const [tags, setTags] = useState([])

  const [activeTab, setActiveTab] = useState('All')
  const handleTabClick = (tab) => {
    setActiveTab(tab)
    localStorage.setItem('content-tab', tab)
    hideMobileMenu()
    scrollTo(0, 0)
  }

  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    }
  }

  const setThemeOnRender = () => {
    const theme = localStorage.getItem('theme')
    if (theme === 'light') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  useEffect(() => {
    document.body.className = theme;
    setThemeOnRender()
  }, [theme])

  const pageProperties = {
    options,
    fetchPosts,
    posts,
    setPosts,
    users,
    showUsers,
    showContent,
    showListOfUsers,
    sortType,
    handleSortTypeChange,
    tags,
    fetchTagData,
    showLoginWindow,
    showSignUpWindow,
    login,
    signUp,
    loginToken,
    handleAlertMessage
  };

  const headerProperties = {
    login,
    isLoggedIn,
    handleLogout,
    showLoginWindow,
    showSignUpWindow,
    activeTab,
    handleTabClick,
    setPosts,
    handleAlertMessage,
    mobileMenu,
    showMobileMenu,
    hideMobileMenu,
    toggleTheme,
    theme,
    loginToken
  };
  

  return (
    <>
      {login ? 
        <Login 
        showSignUpWindow={showSignUpWindow}
        hideLoginWindow={hideLoginWindow}
        setIsLoggedIn={setIsLoggedIn}
        alert={alert}
        setActiveTab={setActiveTab}
        handleAlertMessage={handleAlertMessage}
        /> : ''}

      {signUp ? 
        <SignUp
        hideSignUpWindow={hideSignUpWindow}
        showLoginWindow={showLoginWindow}
        handleAlertMessage={handleAlertMessage}
        /> : ''}

      {login | signUp ? <DimBackground hideLoginOrSignUpWindow={hideLoginOrSignUpWindow} /> : ''}

      <Header {...headerProperties}/>

      <AlertMessage 
        alert={alert}
        alertIsActive={alertIsActive}
        theme={theme}
      />

      <>          
        <Routes>
          <Route path='/All' element={<All {...pageProperties}/>}/>
          <Route path='/Development' element={<Development {...pageProperties}/>}/>
          <Route path='/Admin' element={<Admin {...pageProperties}/>}/>
          <Route path='/Design' element={<Design {...pageProperties}/>}/>
          <Route path='/Article/post-id/:id' element={ <Article {...pageProperties}/>} />
          <Route path='/New-Post' element={<NewPost {...pageProperties}/>}/>
          <Route path='' element={<Home {...pageProperties}/>}/>
        </Routes>

        {loginToken ? 
        <NewPostButtonMobile
        /> : ''}
      </>

      <Footer />
    </>
  )
}

export default App
