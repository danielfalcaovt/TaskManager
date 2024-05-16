import { useEffect, useState } from "react";
import Root from "./pages/Root";
import { authContext } from "./context/auth/auth-context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RotasProtegidas from "./auth/rotasProtegidas";
import { DataContext } from "./context/data/data-context";
import Login from "./routes/Login";
import Cookies from 'js-cookie'
import Register from "./routes/Register";
import Task from "./pages/task";
import Week from "./pages/week";
import User from "./pages/user";
import './styles/index.css'

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

  useEffect(() => {
    verifyJWT(token)
  }, [token])

  return (
    <authContext.Provider value={{auth, setAuth}}>
      <BrowserRouter>
        <Routes>
          <Route 
          path='/' 
          element={
            <RotasProtegidas>
              <DataContext.Provider value={{data, setData}}>
                <Root />
              </DataContext.Provider>
            </RotasProtegidas>
          }>
            <Route path="task" element={<Task/>}/>
            <Route path="week" element={<Week/>}/>
            <Route path="user" element={<User/>}/>
          </Route>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/*" element={<Navigate to="/login" />}/>
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  )
}
