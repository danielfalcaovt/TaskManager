import React from "react";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Header from "../presentation/view/components/header";
import getNotes from "../presentation/api/http/data/notes/get-notes";
import getTasks from "../presentation/api/http/data/tasks/get-task";
import getUser from "../presentation/api/http/data/users/get-user";
import getNotifications from "../presentation/api/http/data/notifications/get-notifications";
import { DataContext } from "../infrastructure/context/data/data-context";
import Aside from "../presentation/view/components/aside";
import '../styles/components/App.css'
import Cookies from 'js-cookie'

export default function Root() {
  const { data, setData } = useContext(DataContext)
  const [load, setLoading] = useState(true)
  const token = Cookies.get('token')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notes = await getNotes(token)
        const tasks = await getTasks(token)
        const user = await getUser(token)
        const notification = await getNotifications(token)
        Promise.all([notes, tasks, user, notification]).then(() => {
          const allNotes = notes.data
          const allTasks = tasks.data
          const userInfo = user.data
          const allNotifications = notification.data
          setData({
            tasks: allTasks,
            notes: allNotes,
            user: userInfo,
            notifications: allNotifications
          })
        })
      } catch (error) {
          console.log(error)
      } finally {
        console.log(data);
         setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {
        load ? (
          <div className={`load-box`}>
            <div className="bg-gradient gradient-1">
            </div>
            <div className="bg-gradient gradient-2">
            </div>
            <div className="loader">
              <span className="loader-text">loading</span>
              <span className="load"></span>
            </div>

          </div>) : ''
      }
      <div id="app">
        <Header />
        <Aside />
        <main id="app-container">
          <Outlet />
        </main>
      </div>
    </>
  )
}
