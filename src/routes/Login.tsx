import { useContext } from "react"
import loginUser from "../http/auth/login-user"
import { authContext } from "../context/auth/auth-context"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import '../styles/login.css'

export default function Login() {
  const { auth, setAuth } = useContext(authContext)
  const navigate = useNavigate()

  async function handleAuth(evt: any) {
    try {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      const user = await loginUser(email, password)
      if (user === false) {
        setAuth(false)
      } else {
        navigate('/')
        Cookies.set('token', user.token)
        setAuth(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <main id="login-page">
        <h1>Login</h1>
        <form onSubmit={handleAuth} id="login-form" method="POST" >
          <div className="email-input">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
              </svg>
            </div>
            <input type="text" placeholder="E-mail" name="email"></input>
          </div>
          <div className="password-input">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
              </svg>
            </div>
            <input type="password" placeholder="Password" name="password"></input>
          </div>
          <button id="send-button">Login</button>
        </form>
      </main>
    </>
  )
};
