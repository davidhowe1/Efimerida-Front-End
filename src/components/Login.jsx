import { React, useState } from 'react'
import { X } from 'react-bootstrap-icons'

function Login({ hideLoginWindow, showSignUpWindow, setIsLoggedIn }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = (event) => {
    event.preventDefault();
    if (validateLogin()) {
      fetch('http://127.0.0.1:8000/user/authentication/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      }).then(response => {
        if (response.ok) {
          return response.json()
        } else {
          alert('Invalid Credentials')
        }
      }).then(data => {
        localStorage.setItem('token', data.token)
        setIsLoggedIn(!!localStorage.getItem('token'))
        hideLoginWindow()
      }).catch(err => {
        console.error('Error:', err)
      })
    }
  }

  const validateLogin = () => {
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.')
      return false
    }

    if (!password) {
      alert('Please enter your password.')
      return false
    }
    return true
  }

  return (
    <section className='login-form'>
      <span>
        <h3>Login</h3>
        <X onClick={hideLoginWindow} 
          style={{cursor: "pointer", height: '25px', width: '25px'}} />
      </span>

      <form action="submit" onSubmit={loginUser}>
        <label htmlFor="email">Email</label>
        <input 
          type="text"
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>

        <button className='submit' type="submit">Login</button>

        <span>
          <p>Don't have an account?</p>
          <a onClick={showSignUpWindow}>Sign Up</a>
        </span>
      </form>

    </section>
  )
}

export default Login