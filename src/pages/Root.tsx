import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Nav from "../components/nav";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/data/data-context";
import Aside from "../components/aside";
import '../styles/components/App.css'

export default function Root() {
  const { data } = useContext(DataContext)
  const [load, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
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
