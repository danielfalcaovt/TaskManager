import { useEffect, useState } from "react";
import Root from "./pages/Root";
import { authContext } from "./context/auth/auth-context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RotasProtegidas from "./auth/rotasProtegidas";
import { DataContext } from "./context/data/data-context";
import Login from "./routes/Login";
import Cookies from 'js-cookie'
import Register from "./routes/Register";

export default function App() {
  const [auth, setAuth] = useState(false)
  const [data, setData] = useState('')

  const verifyJWT = () => {
    const token = Cookies.get('token')
    if (token && typeof token === 'string') {
      setAuth(true)
      return true
    }else {
      setAuth(false)
      return false
    }
  }

  useEffect(() => {
    verifyJWT()
  }, [auth])

  return (
    <authContext.Provider value={{auth, setAuth}}>
      <BrowserRouter>
        <Routes>
          <Route 
          path='/' 
          element={
            <RotasProtegidas>
              <DataContext.Provider value={{data, setData}}>
                <Root/>
              </DataContext.Provider>
            </RotasProtegidas>
          }/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/*" element={<h1>ERROR 404</h1>}/>
        </Routes>
      </BrowserRouter>
      <Root/>
    </authContext.Provider>
  )
}
