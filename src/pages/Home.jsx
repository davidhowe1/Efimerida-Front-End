import React from 'react'

function Home({ showLoginWindow, showSignUpWindow, login, signUp } ) {
  return (
    <>    
        {!login | !signUp ? 
        <section className='home-screen'>
            <div className='image-container'>
                <img src="https://images.unsplash.com/photo-1562907550-096d3bf9b25c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3024&q=80" alt="" />
            </div>

            <div className='container'>
                <h1>Welcome to Efimerida</h1>

                <p>Login with the button below. If you don't have an account you can create one
                    with the Sign Up button below.
                </p>

                <span>
                    <button onClick={showLoginWindow} className='login'>Login</button>
                    <button onClick={showSignUpWindow} className='sign-up'>Sign Up</button>
                </span>
            </div>
        </section> : ' '}
    </>
  )
}

export default Home