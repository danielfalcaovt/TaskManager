import loginUser from "../http/login-user"

export default function Login() {
  async function handleAuth(evt) {
    try {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      const user = await loginUser(email, password)
      console.log(user)
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
