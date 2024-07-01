/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Root from "./presentation/view/pages/Root";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RotasProtegidas from "./core/domain/rotasProtegidas";
import { DataContext } from "./infrastructure/context/data/data-context";
import Login from "./presentation/view/pages/Login";
import Cookies from 'js-cookie'
import Register from "./presentation/view/pages/Register";
import User from "./presentation/view/pages/user";
import Home from "./presentation/view/components/home";
import CalendarPage from "./presentation/view/pages/CalendarPage";
import DayMessage from "./presentation/view/pages/DayMessage";
import Config from "./presentation/view/pages/Config";
import Notes from "./presentation/view/pages/Notes";
import Notification from "./presentation/view/pages/Notification";
import { IData } from "./infrastructure/services/data-interface";

export default function App() {
  const [data, setData] = useState<IData>(       
  {  
    notes: [],
    notifications: [],
    tasks: [],
    token: undefined,
    user: undefined
  }
  )
  const token = Cookies.get('token')

  const verifyJWT = (jwt: string | undefined) => {
    if (jwt && typeof jwt === 'string') {
      return true
    }
  }

  useEffect(() => {
    verifyJWT(token)
  }, [token])

  return (
    <DataContext.Provider value={{ data, setData }}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <RotasProtegidas>
                <Root />
              </RotasProtegidas>
            }>
            <Route path="/" element={<Home />} />
            <Route path="notes" element={<Notes />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="daymessage" element={<DayMessage />} />
            <Route path="profile" element={<User />} />
            <Route path="config" element={<Config/>}/>
            <Route path="notification" element={<Notification/>}/>
            <Route path="forget" element={<h1>Test</h1>}/>
            <Route path="/*" element={<Navigate to="/"/>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  )
}
