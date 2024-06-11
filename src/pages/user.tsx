import { useContext, useEffect } from "react"
import { DataContext } from "../context/data/data-context"

export default function User() {
  const { data } = useContext(DataContext)

  return (
    <section id="user">
      <div id="user-container">
        {
          data.user ? (
            <>
              <h1>{data.user.username}</h1>
              <h2>{data.user.email}</h2>
            </>
          ) : 'Usuário não encontrado'
        }
      </div>
    </section>
  )
}
