/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../infrastructure/context/data/data-context";
import Aside from "../components/aside";
import Cookies from 'js-cookie'
import getNotes from "../../api/http/data/notes/get-notes";
import getTasks from "../../api/http/data/tasks/get-task";
import getUser from "../../api/http/data/users/get-user";
import getNotifications from "../../api/http/data/notifications/get-notifications";
import { AxiosResponse } from "axios";
import { IDataContext } from "../../../infrastructure/services/data-interface";

export default function Root() {
  const { data, setData }: IDataContext = useContext(DataContext)
  const [load, setLoading] = useState(true)
  const token : string | undefined = Cookies.get('token')

  const fetchData = async () => {
    let allNotes : any
    let allTasks : any
    let userInfo : any
    let allNotifications : any
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
        allTasks = tasks.data.sort((a: any, b: any) => {
          if (a.task_month !== b.task_month) {
            return a.task_month - b.task_month; 
          } else {
            return a.task_day - b.task_day;
          }
        })
      } else {
        allTasks = []
      }

      if (user.data) {
        const requiredParameters = ['id', 'username', 'email']
        for (const pos of requiredParameters) {
          if (!user.data[pos]) {
            return new Error();
          }
        }
        userInfo = user.data
      } else {
        return new Error();
      }

      if (notification.data) {
        allNotifications = notification.data
      } else {
        allNotifications = []
      }
    } catch (error) {
      
      return false
    } finally {
      setData({
        tasks: allTasks,
        notes: allNotes,
        user: userInfo,
        notifications: allNotifications,
        token
      })
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
      </div>
    </>
  )
}
