/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react"
import { DataContext } from "../context/data/data-context"
import '../styles/components/notification.css'

export default function Notification() {
  const { data } = useContext(DataContext)

  return (
    <>
      <div id="notifications-container">
        <div id="notifications-header">
          <h1>Caixa de Mensagens</h1>
        </div>
        <div id="notifications-receiver">
          {data.notifications ? data.notifications.map((news: any) => {
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
