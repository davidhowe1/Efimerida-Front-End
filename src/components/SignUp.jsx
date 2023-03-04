import { React, useState} from 'react'
import { X } from 'react-bootstrap-icons'

function SignUp({ hideSignUpWindow, showLoginWindow, handleAlertMessage }) {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [signupComplete, setSignupComplete] = useState(false)

  console.log(signupComplete)
  
  const handleSignUp = (event) => {
    event.preventDefault();
    if (validateSignUp()) {
      fetch('http://127.0.0.1:8000/user/registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        })
      }).then(response => {
        if (response.ok) {
          setSignupComplete(true)
        } else {
          handleAlertMessage('Error: Registration Failed. Please try again.')
        }
      }).catch(err => {
        console.error('Error: ', err)
      })
      }
    }

  const validateSignUp = () => {
    if (!username) {
      handleAlertMessage('Error: Please enter a username.');
      return false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      handleAlertMessage('Error: Please enter a valid email address (example@example.com).');
      return false;
    }

    if (!password) {
      handleAlertMessage('Error: Please enter a password.');
      return false;
    }

    if (password !== verifyPassword) {
      handleAlertMessage('Error: Please make sure your verified password matches.');
      return false;
    }

    if (!agreeToTerms) {
      handleAlertMessage('Error: Please agree to terms and conditions')
      return false
    }

    return true;
  };

  return (
    <section className='login-form'>
      {!signupComplete ? 
      <>
      <span>
        <h3>Sign Up</h3>
        <X onClick={hideSignUpWindow} 
          style={{cursor: "pointer", height: '25px', width: '25px'}} />
      </span>

      <form onSubmit={handleSignUp}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="verify-password">Verify Password</label>
        <input
          type="password"
          name="verify-password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
        />

        <span>
          <input 
            type="checkbox" 
            name="agree-to-terms" 
            id="terms"
            checked={agreeToTerms}
            onChange={() => setAgreeToTerms(!agreeToTerms)}/>
            <p>I agree to the terms of service</p>
        </span>

        <button className='submit' type='submit'>Sign Up</button>
      </form>
      </> : 
      
      <>
      <span>
        <h3>Account Created!</h3>
        <X onClick={hideSignUpWindow}
         style={{cursor: "pointer", height: '25px', width: '25px'}} />
      </span>
      
      <button className='sign-up' onClick={showLoginWindow}>Login</button>
      </>
      }
    </section>
  );
}

export default SignUp