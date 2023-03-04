import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './App.css'
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
import NewPostForm from './components/NewPostForm'
import AlertMessage from './components/AlertMessage';

function App() {

  const [login, setLogin] = useState(false)
  const showLoginWindow = () => {setLogin(true);hideSignUpWindow()}
  const hideLoginWindow = () => setLogin(false)

  const loginToken = !!localStorage.getItem('token')
  const [isLoggedIn, setIsLoggedIn] = useState(loginToken)

  const handLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  const [signUp, setSignUp] = useState(false)
  const showSignUpWindow = () => {setSignUp(true);hideLoginWindow()}
  const hideSignUpWindow = () => setSignUp(false)
  const hideLoginOrSignUpWindow = () => {setLogin(false);setSignUp(false)}


  const [showUsers, setShowUsers] = useState(false)
  const showContent = () => setShowUsers(false)
  const showListOfUsers = () => setShowUsers(true)

  const [sortType, setSortType] = useState('latest')
  const handleSortTypeChange = (type) => {
    setSortType(type)
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
    scrollTo(0, 0)
  }

  const [newPostForm, setNewPostForm] = useState(false)
  const showNewPostForm = () => setNewPostForm(true)
  const hideNewPostForm = () => setNewPostForm(false)

  return (
    <>
      {login ? 
        <Login 
          showSignUpWindow={showSignUpWindow}
          hideLoginWindow={hideLoginWindow}
          setIsLoggedIn={setIsLoggedIn}
          alert={alert}
          handleAlertMessage={handleAlertMessage}
        /> : ''}

      {signUp ? 
        <SignUp
          hideSignUpWindow={hideSignUpWindow}
          showLoginWindow={showLoginWindow}
          handleAlertMessage={handleAlertMessage}
        /> : ''}

      {login | signUp ?
       <DimBackground 
        hideLoginOrSignUpWindow={hideLoginOrSignUpWindow} />
        : ''}

      {newPostForm ? 
        <>
        <NewPostForm 
          hideNewPostForm={hideNewPostForm}
          handleAlertMessage={handleAlertMessage}
        />
        <DimBackground hideLoginOrSignUpWindow={hideNewPostForm}/>
        </>
        : ''}

      <Header 
        login={login}
        isLoggedIn={isLoggedIn}
        handLogout={handLogout}
        showLoginWindow={showLoginWindow}
        showSignUpWindow={showSignUpWindow}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        newPostForm={newPostForm}
        showNewPostForm={showNewPostForm}
        setPosts={setPosts}
        handleAlertMessage={handleAlertMessage}
      />

      <AlertMessage 
        alert={alert}
        alertIsActive={alertIsActive}
      />

      {isLoggedIn ? 
        <>          
          <Routes>
            <Route path='/All' element={
              <All
              options={options}
              fetchPosts={fetchPosts}
              posts={posts}
              setPosts={setPosts}
              users={users}
              showUsers={showUsers}
              showContent={showContent}
              showListOfUsers={showListOfUsers}
              sortType={sortType}
              handleSortTypeChange={handleSortTypeChange}
              />}
            />
            
            <Route path='/Development' element={
              <Development
              options={options}
              fetchPosts={fetchPosts}
              posts={posts}
              setPosts={setPosts}
              users={users}
              showUsers={showUsers}
              showContent={showContent}
              showListOfUsers={showListOfUsers}
              sortType={sortType}
              handleSortTypeChange={handleSortTypeChange}
              />}
            />

            <Route path='/Admin' element={
              <Admin
              options={options}
              fetchPosts={fetchPosts}
              posts={posts}
              setPosts={setPosts}
              users={users}
              showUsers={showUsers}
              showContent={showContent}
              showListOfUsers={showListOfUsers}
              sortType={sortType}
              handleSortTypeChange={handleSortTypeChange}
              />}
            />

            <Route path='/Design' element={
              <Design
              options={options}
              fetchPosts={fetchPosts}
              posts={posts}
              setPosts={setPosts}
              users={users}
              showUsers={showUsers}
              showContent={showContent}
              showListOfUsers={showListOfUsers}
              sortType={sortType}
              handleSortTypeChange={handleSortTypeChange}
              />}
            />

            <Route path='/Article/post-id/:id' element={
              <Article
              tags={tags}
              fetchTagData={fetchTagData}
              options={options}
              handleAlertMessage={handleAlertMessage}
              />}
            />
          </Routes> 
        </>
        : 
        <Home 
        showLoginWindow={showLoginWindow}
        showSignUpWindow={showSignUpWindow}
        login={login}
        signUp={signUp}
        />}
    </>
  )
}

export default App
