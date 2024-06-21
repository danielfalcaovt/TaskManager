import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header";
import Nav from "../components/nav";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/data/data-context";
import Aside from "../components/aside";
import '../styles/components/App.css'
import Cookies from 'js-cookie'
import getNotes from "../http/data/notes/get-notes";
import getTasks from "../http/data/tasks/get-task";
import getUser from "../http/data/users/get-user";
import getNotifications from "../http/data/notifications/get-notifications";

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
        <Nav />
      </div>
    </>
  )
}
