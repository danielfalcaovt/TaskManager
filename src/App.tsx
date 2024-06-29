/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Root from "./pages/Root";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RotasProtegidas from "./auth/rotasProtegidas";
import { DataContext } from "./context/data/data-context";
import Login from "./routes/Login";
import Cookies from 'js-cookie'
import Register from "./routes/Register";
import User from "./pages/user";
import Home from "./components/home";
import './styles/index.css'
import CalendarPage from "./pages/CalendarPage";
import DayMessage from "./pages/DayMessage";
import Config from "./pages/Config";
import Notes from "./pages/Notes";
import Notification from "./pages/Notification";

export default function App() {
  const [data, setData] = useState([])
  const token = Cookies.get('token')

  const verifyJWT = (jwt: any) => {
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
