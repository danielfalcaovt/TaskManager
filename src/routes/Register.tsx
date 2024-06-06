import { Link, useNavigate } from "react-router-dom"
import registerUser from "../http/auth/register-user"
import { useContext, useEffect, useState } from "react"
import { authContext } from "../context/auth/auth-context"
import '../styles/auth/register.css'

export default function Register() {
  const navigate = useNavigate()
  const [hasError, setError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const { auth, setAuth } = useContext(authContext)

  async function handleRegister(evt: any) {
      evt.preventDefault()
      const username = evt.target.username.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      const confirmPassword = evt.target.confirmPassword.value
      const user = await registerUser(username, email, password, confirmPassword)
      console.log(user);
      if (user.status === 200) {
        navigate('/')
        return false
      } else {
        setError(true)
        setErrorText(user.response.data)
      }
  }

  function showPassword() {
    const passwordInput: any = document.querySelector("#password-input-element")
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'
    } else {
      passwordInput.type = 'password'
    }
  }

  useEffect(() => {
    if (auth) {
      navigate('/')
    }
  }, [auth])

  return (
    <>
    {hasError? 
      <div className="error-container" style={hasError?{display: 'flex'}:{}}>
        <div onClick={() => {setError(false)}} className="error-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
        <div className="error-title">
          <h1>{errorText.toUpperCase()}</h1>
        </div>
      </div>
      : ""}
      <div id="login-container">
        <main id="login-page">
          <h1 id="login-message">Register</h1>
          <form onSubmit={handleRegister} id="login-form" method="POST" >
            <div className="email-input">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
              </div>
              <input type="text" placeholder="Username" name="username"></input>
            </div>
            <div className="email-input">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                </svg>
              </div>
              <input type="email" placeholder="E-mail" name="email"></input>
            </div>
            <div className="password-input">
              <div id="password-input-h">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
                  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
              </div>
              <input type="password" placeholder="Password" id="password-input-element" name="password"></input>
              <div onClick={showPassword} id="show-password">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
              </div>
            </div>
            <div className="cpassword-input">
              <div id="cpassword-input-h">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
                  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
              </div>
              <input type="password" placeholder="Confirm Password" id="cpassword-input-element" name="confirmPassword"></input>
            </div>
            <div className="login-link">
              <Link to='/login'>Already Registered?</Link>
            </div>
            <button id="send-button">Register</button>
          </form>
        </main>
      </div>
    </>
  )
};
