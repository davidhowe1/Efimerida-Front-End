import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef, useMemo } from 'react';
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
import Profile from './pages/Profile';
import Subscriptions from './pages/Subscriptions';
import User from './pages/User';

function App() {

  const [login, setLogin] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const token = localStorage.getItem('token')
  const loginToken = !!token
  let userData = JSON.parse(localStorage.getItem('user_data'))
  const userId = userData ? userData.id : ''
  const [isLoggedIn, setIsLoggedIn] = useState(loginToken)

  const showLoginWindow = () => {setLogin(true), hideSignUpWindow(), hideMobileMenu()}
  const hideLoginWindow = () => setLogin(false)

  const handleLogout = () => {
    removeDetailsFromLocalStorage()
    setIsLoggedIn(false)
    hideMobileMenu()
    handleAlertMessage('Logged Out')
  }

  const saveDetailsToLocalStorage = (data) => {
    localStorage.setItem('user_data', JSON.stringify(data))
  }

  const removeDetailsFromLocalStorage = () => {
    localStorage.removeItem('user_data')
    localStorage.removeItem('token')
  }



  const showSignUpWindow = () => { setSignUp(true), hideLoginWindow(), hideMobileMenu() }
  const hideSignUpWindow = () => setSignUp(false)
  const hideLoginOrSignUpWindow = () => { setLogin(false), setSignUp(false) }

  const [mobileMenu, setMobileMenu] = useState(false)
  const showMobileMenu = () => setMobileMenu(true)
  const hideMobileMenu = () => setMobileMenu(false)

  const [sortType, setSortType] = useState('latest')
  const handleSortTypeChange = (type) => { setSortType(type), scrollTo(0, 0) }

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
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
  }

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/user/detail/${userId}`, options)
      const data = await response.json()
      saveDetailsToLocalStorage(data)
    } catch (error) {
      console.error(error)
    }
  }
  
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/post/list/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      setPosts(data.results)
    } catch (error) {
      console.error(error)
    }
  }

  const [users, setUsers] = useState([])

  const subscribedUsers = useMemo(() => {
    return users.map(user => user.username);
  }, [users])

  const fetchUserList = async () => {
    if (loginToken) {
      try {
        const response = await fetch('http://127.0.0.1:8000/user/get_subscribe/', options)
        const data = await response.json() 
        setUsers(data.results)
      } catch (error) {
        console.error(error)
      }
    }
  }


  const renderProfileImages = useMemo(() => (imageURL) => {
    if (!imageURL) {
      return <img src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' alt='Authors Profile Picture'/>
    } else if (imageURL.includes('http://127.0.0.1:8000')) {
      return <img src={imageURL} alt='Authors Profile Picture'/>
    } else {
      return <img src={`http://127.0.0.1:8000/${imageURL}`} alt='Authors Profile Picture'/>
    }
  }, []);


  const subscribeToUser = async (userId) => {
    if (loginToken) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/user/subscribe/${userId}/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
          }
        })
        if (response.ok) {
          handleAlertMessage('Subscription Added')
          await fetchUserList()
        } else {
          handleAlertMessage('Subscription already added')
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      showLoginWindow()
    }
  }

  const unsubscribeFromUser = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/user/subscribe/${userId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        }
      })
      if (response.ok) {
        handleAlertMessage('Subscription Removed')
        await fetchUserList()
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPosts()
    fetchUserList()
    setActiveTab(localStorage.getItem('content-tab'))
  }, [])


  const fetchTagData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/post/tag_list/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      setTags(data.results)
    } catch (error) {
      console.error(error)
    }
  } 

  const [tags, setTags] = useState([])
  
  const [activeTab, setActiveTab] = useState('/All')
  const currentPageURL = window.location.pathname;

  const handleTabChange = () => { setActiveTab(currentPageURL), setMobileMenu(false) }
  
  useEffect(() => {
    handleTabChange()
  }, [currentPageURL])


  const getImageSrc = (userImage) => {
    if (userImage ) {
      if (userImage.includes('http://127.0.0.1:8000')) {
        return userImage;
      } else if (!userImage) {
        return 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      } else {
        return `http://127.0.0.1:8000/images/${userImage}`;
      }
    } else {
      return 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
    }
  };


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
    token,
    userData,
    userId,
    options,
    fetchUserData,
    fetchPosts,
    fetchUserList,
    handleTabChange,
    posts,
    setPosts,
    users,
    subscribeToUser,
    unsubscribeFromUser,
    sortType,
    handleSortTypeChange,
    tags,
    fetchTagData,
    getImageSrc,
    showLoginWindow,
    showSignUpWindow,
    login,
    signUp,
    loginToken,
    handleAlertMessage,
    renderProfileImages,
    subscribedUsers
  };

  const headerProperties = {
    login,
    userData,
    isLoggedIn,
    handleLogout,
    showLoginWindow,
    showSignUpWindow,
    activeTab,
    handleTabChange,
    setPosts,
    handleAlertMessage,
    mobileMenu,
    showMobileMenu,
    hideMobileMenu,
    toggleTheme,
    getImageSrc,
    theme,
    loginToken,
    renderProfileImages
  };
  
  return (
    <>
      {login ? 
        <Login 
        userId={userId}
        showSignUpWindow={showSignUpWindow}
        hideLoginWindow={hideLoginWindow}
        setIsLoggedIn={setIsLoggedIn}
        alert={alert}
        setActiveTab={setActiveTab}
        handleAlertMessage={handleAlertMessage}
        saveDetailsToLocalStorage={saveDetailsToLocalStorage}
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
          <Route path='/Profile' element={<Profile {...pageProperties}/>}/>
          <Route path='/User/:id' element={<User {...pageProperties}/>}/>
          <Route path='/Subscriptions' element={<Subscriptions {...pageProperties}/>}/>
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
