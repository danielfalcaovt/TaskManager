import { useContext, useEffect, useState } from "react";
import Root from "./pages/Root";
import { authContext } from "./context/auth/auth-context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RotasProtegidas from "./auth/rotasProtegidas";
import { DataContext } from "./context/data/data-context";
import Login from "./routes/Login";
import Cookies from 'js-cookie'
import getData from "./http/get-data";

export default function App() {
  const [auth, setAuth] = useState(false)
  const [data, setData] = useState('')

  const verifyJWT = () => {
    const jwt = Cookies.get('jwt')
    if (jwt && typeof jwt === 'string') {
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
          <Route path="/register"/>
          <Route path="/*" element={<h1>ERROR 404</h1>}/>
        </Routes>
      </BrowserRouter>
      <Root/>
    </authContext.Provider>
  )
}
