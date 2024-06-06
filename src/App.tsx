import { useEffect, useState } from "react";
import Root from "./pages/Root";
import { authContext } from "./context/auth/auth-context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RotasProtegidas from "./auth/rotasProtegidas";
import { DataContext } from "./context/data/data-context";
import Login from "./routes/Login";
import Cookies from 'js-cookie'
import Register from "./routes/Register";
import User from "./pages/User";
import Home from "./components/home";
import './styles/index.css'
import CalendarPage from "./pages/CalendarPage";
import DayMessage from "./pages/DayMessage";
import Notice from "./pages/Notice";
import Config from "./pages/Config";
import Notes from "./pages/Notes";

export default function App() {
  const [auth, setAuth] = useState(false)
  const [data, setData] = useState('')
  const token = Cookies.get('token')

  const verifyJWT = (jwt: string) => {
    if (jwt && typeof jwt === 'string') {
      setAuth(true)
      return true
    }
  }

  async function getAllUserNotes() {
    
  }  

  useEffect(() => {
    verifyJWT(token)
  }, [token])

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <RotasProtegidas>
                <DataContext.Provider value={{ data, setData }}>
                  <Root />
                </DataContext.Provider>
              </RotasProtegidas>
            }>
            <Route path="/" element={<Home />} />
            <Route path="notes" element={<Notes />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="daymessage" element={<DayMessage />} />
            <Route path="profile" element={<User />} />
            <Route path="config" element={<Config/>}/>
            <Route path="notice" element={<Notice/>}/>
            <Route path="/*" element={<Navigate to="/"/>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  )
}
