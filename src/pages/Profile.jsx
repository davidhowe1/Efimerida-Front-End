import { React, useState, useEffect } from 'react'
import { X , Pencil } from 'react-bootstrap-icons'
import DimBackground from '../components/DimBackground'
import Posts from '../components/Posts'

function Profile({ loginToken, handleAlertMessage, renderProfileImages, userId }) {

    const [userData, setUserData] = useState()
    const [form, setForm] = useState({})
    const [updateDetailsform, setUpdateDetailsForm] = useState()
    const [userPosts, setUserPosts] = useState([])
    const openUpdateForm = (form) => setUpdateDetailsForm(form)
    const closeUpdateForm = (form) => setUpdateDetailsForm(form)
    
    const token = localStorage.getItem('token')

    const getUserData = () => {
      fetch(`http://127.0.0.1:8000/user/detail/${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }})
      .then(response => response.json())
      .then(data => {
        setUserData(data)
        fetchUserPosts(data.username)
      })
      .catch(error => console.log(error))
    }

    const fetchUserPosts = (username) => {
      fetch('http://127.0.0.1:8000/post/by_filter/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              post_author: {
                  username: `${username}`,
              }
          })
          })
          .then(response => {return response.json()})
          .then(data => setUserPosts(data))
          .catch(err => console.error(err))
      }

    useEffect(() => {
      getUserData()
    }, [])

    const changeProfilePicture = async (event) => {
      const image = event.target.files[0];

      const formData = new FormData();
      formData.append('user_image', image);
    
      try {
        const response = await fetch(`http://127.0.0.1:8000/user/detail/${userId}/`, {
          method: 'PATCH',
          body: formData,
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        
        if (response.ok) {
          setUpdateDetailsForm(false);
          handleAlertMessage('Profile Image Updated!');
        } 
      } catch (error) {
        handleAlertMessage('Error: There was an problem updating your profile picture');
      }
      getUserData()
    }

    const changeUsername = (event) => {setForm({'username': event.target.value})}
    const changeUserEmail = (event) => {setForm({'email': event.target.value})}
    const changeProfileBio = (event) => {setForm({'user_info': event.target.value})}


    const handleFormTitle = () => {
      if (updateDetailsform === 'username') {
        return 'Change Username'
      } else if (updateDetailsform === 'email') {
        return 'Change Email'
      } else {
        return 'Change Bio'
      }
    }

    const handleFormDataInput = () => {
      if (updateDetailsform === 'username') {

        return <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" placeholder='New Username...' onChange={changeUsername}/>
                <button className='new-post' type="submit">Submit</button>
              </form>
      } else if (updateDetailsform === 'email') {

        return <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" placeholder='New Email...' onChange={changeUserEmail}/>
                <button className='new-post' type="submit">Submit</button>
              </form>
      } else {

        return <form onSubmit={handleSubmit} encType="multipart/form-data">
                <textarea type="text" placeholder='New Bio...' onChange={changeProfileBio}/>
                <button className='new-post' type="submit">Submit</button>
              </form>
      }
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const key = Object.keys(form)[0]
      const keyToString = key.toString()
      const formValue = form[key]

      const formData = new FormData();
      formData.append(keyToString, formValue)

      try {
        const response = await fetch(`http://127.0.0.1:8000/user/detail/${userId}/`, {
          method: 'PATCH',
          body: formData,
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json()
          setUpdateDetailsForm(false)
          handleAlertMessage('Profile Updated!')
        } else {
          console.log('There was an error')
        }
      } catch (error) {
        console.error(error);
      }
      getUserData()
    }
  
    return (
      <>
        {updateDetailsform ? <DimBackground /> : ''}

        <section className='profile-section'>
          {userData && loginToken ? 
          <>
            <div className='details'>
              <div className='image-container'>
                <label htmlFor='image'>Select file</label>
                <input className='hidden' type="file" id='image' name='image' accept='image/*' onChange={changeProfilePicture}/>
                <img src={userData.user_image ? 
                  userData.user_image 
                  : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}/>
              </div>

              <div className='user-details'>
                <label htmlFor="email">Email</label>
                <h3>{userData.email}</h3>

                <label htmlFor="username">Username
                <button className='new-post' 
                  onClick={() => {openUpdateForm('username')}}>Edit <Pencil style={{marginLeft: '5px'}}/>
                  </button>
                </label>

                <h3>{userData.username}</h3>

                <label htmlFor="email">Bio
                  <button className='new-post' 
                  onClick={() => {openUpdateForm('bio')}}>Edit <Pencil style={{marginLeft: '5px'}}/>
                  </button>
                </label>

                <p className='user-info'>
                  {userData.user_info ? userData.user_info : 'Nothing yet...'}
                </p>
              </div>
            </div>

            <div className='posts'>
            <h1>Your Posts</h1>
                <Posts 
                posts={userPosts}
                renderProfileImages={renderProfileImages}
                />
            </div>
            
            <div className={updateDetailsform ? 'update-form-container' : 'update-form-container hidden'}>
              <span>
                <h3>{handleFormTitle()}</h3>
                <X onClick={() => {closeUpdateForm('')}} style={{cursor: "pointer", height: '25px', width: '25px'}} />
              </span>

              {handleFormDataInput()}
            </div>
          </> : <h3>Login to view profile</h3>}
        </section>
      </>
    );
  }

export default Profile