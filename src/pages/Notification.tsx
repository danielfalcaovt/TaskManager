import { useContext } from "react"
import { DataContext } from "../context/data/data-context"

export default function Notification() {
  const {data} = useContext(DataContext)

  return (
    <>
      <div id="notifications-container">
        <h1>Caixa de Mensagens</h1>
        <div id="notification-receiver">
          {data.notifications ? data.notifications.map((news) => {
            return (
              <div className="new" key={news.notificationid}>
                <h1>{news.title}</h1>
                <p>{news.message}</p>
                <p>{news.timestamp}</p>
              </div>
            )
          }): ''}
        </div>
      </div>
    </>
  )
};
