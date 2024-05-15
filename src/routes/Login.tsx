import { useContext } from "react"
import loginUser from "../http/login-user"
import { authContext } from "../context/auth/auth-context"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const {setAuth} = useContext(authContext)
  const navigate = useNavigate()

  async function handleAuth(evt) {
    try {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      const user = await loginUser(email, password)
      if (user === false) {
        setAuth(false)
      }else {
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
        <form onSubmit={handleAuth} id="login-form" method="POST" >
          <input type="text" placeholder="email" name="email"></input>
          <input type="password" placeholder="password" name="password"></input>
          <button id="login-form-sendButton">Enviar</button>
        </form>
      </main>
    </>
  )
};
