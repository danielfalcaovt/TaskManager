/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Root from "./presentation/view/pages/Root";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RotasProtegidas from "./core/domain/rotasProtegidas";
import { DataContext } from "./infrastructure/context/data/data-context";
import Login from "./presentation/view/pages/Login";
import Cookies from "js-cookie";
import Home from "./presentation/view/components/home";
import Notes from "./presentation/view/pages/Notes";
import CalendarPage from "./presentation/view/pages/CalendarPage";
import User from "./pages/user";
import Config from "./presentation/view/pages/Config";
import Register from "./presentation/view/pages/Register";
import Notification from "./presentation/view/pages/Notification";


export default function App() {
  const [data, setData] = useState<any>({});
  const token = Cookies.get("token");

  const verifyJWT = (jwt: string | undefined) => {
    if (jwt && typeof jwt === "string") {
      return true;
    }
  };

  useEffect(() => {
    verifyJWT(token);
  }, [token]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RotasProtegidas>
                <Root />
              </RotasProtegidas>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="notes" element={<Notes />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="profile" element={<User />} />
            <Route path="config" element={<Config />} />
            <Route path="notification" element={<Notification />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<h1>Test</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}
