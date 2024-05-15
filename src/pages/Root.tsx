import { Outlet } from "react-router-dom";
import Header from "../elements/header";
import Nav from "../elements/nav";
import { useContext } from "react";
import { DataContext } from "../context/data/data-context";

export default function Root() {
  const { data } = useContext(DataContext)

  return (
    <div id="app">
      <Header />
      <Outlet />
      <Nav />
    </div>
  )
}
