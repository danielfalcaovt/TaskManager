import { useContext, useEffect } from "react"
import { DataContext } from "../context/data/data-context"
import Cookies from 'js-cookie'
import getUser from "../http/data/users/get-user"

export default function User() {
  const { data, setData } = useContext(DataContext)
  const jwt = Cookies.get('token')

  function handleUser(evt) {
    evt.preventDefault()
  }

  console.log(data);
  return (
    <section id="user">
      <div id="user-container">
        {
          data.user ? (
            <form onSubmit={handleUser} method="POST">
              <input type="text" placeholder={data.user.username} name="username"></input>
              <input type="email" placeholder={data.user.email} name="email"></input>
              <input type="password" placeholder="********" name="password"></input>
            </form>
          ) : 'Usuário não encontrado'
        }
      </div>
    </section>
  )
}
