/* eslint-disable react/prop-types */

import { Navigate } from 'react-router'
import Cookies from 'js-cookie'
import { useContext } from 'react'
import { authContext } from '../context/auth/auth-context'

export default function RotasProtegidas({ children }) {
  const {auth, setAuth} = useContext(authContext)
  const token = Cookies.get('token')
  if (token) {
    setAuth(true)
    return children
  } else {
    return <Navigate to="/login" />
  }
}
