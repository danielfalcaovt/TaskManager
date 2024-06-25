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

export default function Root() {
  const { data, setData } = useContext(DataContext)
  const [load, setLoading] = useState(true)
  const token : string | undefined = Cookies.get('token')

  const fetchData = async () => {
    let allNotes : any, allTasks : any, userInfo : any, allNotifications : any
    try {
      const notes : AxiosResponse = await getNotes(token)
      const tasks : AxiosResponse = await getTasks(token)
      const user : AxiosResponse = await getUser(token)
      const notification : AxiosResponse = await getNotifications(token)
      if (notes.data) {
        allNotes = notes.data
      } else {
        allNotes = []
      }

      if (tasks.data) {
        allTasks = tasks.data
      } else {
        allTasks = []
      }

      if (user.data) {
        userInfo = user.data
      } else {
        return new Error();
      }

      if (notification.data) {
        allNotifications = notification.data
      } else {
        allNotifications = []
      }
      tasks.data.sort((a:any, b:any) => a.task_day - b.task_day)
    } catch (error) {
      console.log(error)
      return false
    } finally {
      setData({
        tasks: allTasks,
        notes: allNotes,
        user: userInfo,
        notifications: allNotifications,
        token
      })
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
