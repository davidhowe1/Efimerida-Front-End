import { React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Posts from '../components/Posts'

function User({ renderProfileImages, subscribedUsers, unsubscribeFromUser, subscribeToUser }) {

    const [userData, setUserData] = useState([])
    const [username, setUsername] = useState()
    const [userPosts, setUserPosts] = useState([])
    const { id } = useParams()

    const getUserData = async () => {
        try {
            const response = await fetch(`https://efimerida.herokuapp.com/user/detail/${id}/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
            setUserData(data)
            setUsername(data.username)
            fetchUserPosts(data.username)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchUserPosts = async (username) => {
        try {
            const response = await fetch('https://efimerida.herokuapp.com/post/by_filter/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    post_author: {
                        username: `${username}`,
                    }
                })
            })
            const data = await response.json()
            setUserPosts(data)
        } catch (error) {   
            console.error(error)
        }
    }

    useEffect(() => {
    getUserData()
    fetchUserPosts()
    }, [])

  return (
    <section className='profile-section'>
        <div className='details'>
            <div className='image-container'>
            <img src={userData.user_image ? 
                userData.user_image 
                : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}/>
            </div>

            <div className='user-details'>
                <label htmlFor="username">Username</label>
                <h3>{userData.username}
                    <button 
                        onClick={() => {
                            {subscribedUsers.includes(username)
                            ? unsubscribeFromUser(id) 
                            : subscribeToUser(id)}
                        }} 
                        className={subscribedUsers.includes(username)
                        ? 'new-post subscribed'
                        : 'new-post'}>
                        {subscribedUsers.includes(username)
                        ? ''
                        : 'Subscribe'}
                    </button>
                </h3>

                <label htmlFor="email">Bio</label>
                <p className='user-info'>
                    {userData.user_info ? userData.user_info : 'Nothing yet...'}
                </p>
            </div>
        </div>

        <div className='posts'>
            <h1>Posts by {username} {`(${userPosts.length})`}</h1>
                <Posts 
                posts={userPosts}
                renderProfileImages={renderProfileImages}
                />
        </div>
    </section>
  )
}

export default User