import { useNavigate } from "react-router-dom"
import registerUser from "../http/auth/register-user"
import { useContext } from "react"
import { authContext } from "../context/auth/auth-context"

export default function Register() {
  const navigate = useNavigate()
  const { setAuth } = useContext(authContext)

  async function handleRegister(evt: any) {
    try {
      evt.preventDefault()
      const username = evt.target.username.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      const confirmPassword = evt.target.confirmPassword.value
      const user = await registerUser(username, email, password, confirmPassword)
      if (user === false) {
        setAuth(false)
      } else {
        const registerMessageElement: any = document.querySelector('#register-message')
        registerMessageElement.innerHTML = 'Registrado com Sucesso!'
        setTimeout(() => {
          navigate('/login')
        }, 1000);
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1 id="register-message">Register Page</h1>
      <main id="register-page">
        <form onSubmit={handleRegister} id="register-form" method="POST" >
          <input type="text" placeholder="username" name="username"></input>
          <input type="email" placeholder="email" name="email"></input>
          <input type="password" placeholder="password" name="password"></input>
          <input type="password" placeholder="password confirmation" name="confirmPassword"></input>
          <button id="register-form-sendButton">Enviar</button>
        </form>
      </main>
    </>
  )
};
