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
import { AxiosResponse } from "axios";
import { ITask } from "../http/data/tasks/services/task-interfaces";
import { INotes } from "../http/data/notes/services/notes-interfaces";

export default function Root() {
  const { data, setData } = useContext(DataContext)
  const [load, setLoading] = useState(true)
  const token : string | undefined = Cookies.get('token')

  const fetchData = async () => {
    try {
      const notes : AxiosResponse = await getNotes(token)
      const tasks : AxiosResponse = await getTasks(token)
      const user : AxiosResponse = await getUser(token)
      const notification : AxiosResponse = await getNotifications(token)
      Promise.all([notes, tasks, user, notification]).then(() => {
        let allNotes : any, allTasks : any, userInfo : any, allNotifications : any
        notes.data ? allNotes = notes.data : allNotes = []
        tasks.data ? allTasks = tasks.data : allTasks = []
        user.data ? userInfo = user.data : userInfo = []
        notification.data ? allNotifications = notification.data : allNotifications = []
        tasks.data.sort((a:any, b:any) => a.task_day - b.task_day)
        setData({
          tasks: allTasks,
          notes: allNotes,
          user: userInfo,
          notifications: allNotifications,
          token
        })
        console.log(data.tasks)
        console.log('tasks ^')
      })
    } catch (error) {
        console.log(error)
    } finally {
      console.log(data);
       setLoading(false)
    }
  }
  useEffect(() => {
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
