import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Nav from "../components/nav";
import { useContext } from "react";
import { DataContext } from "../context/data/data-context";
import Aside from "../components/aside";
import '../styles/components/App.css'

export default function Root() {
  const { data } = useContext(DataContext)

  return (
    <div id="app">
      <Header />
      <Aside />
      <main id="app-container">
        <Outlet />
      </main>
      <Nav />
    </div>
  )
}
