/* eslint-disable react/prop-types */

import { Navigate } from 'react-router'
import Cookies from 'js-cookie'
import { useContext } from 'react'
import { authContext } from '../context/auth/auth-context'
import { DataContext } from '../context/data/data-context'
import { UserContext } from '../context/data/user-context'

export default function RotasProtegidas({ children }) {
  const { auth, setAuth } = useContext(authContext)
  const { data, setData } = useContext(DataContext)
  const { user, setUser } = useContext(UserContext)
  if (data.length === 'undefined') {
    console.log('tem nada saa porra');
  }
  console.log(user);
  const token = Cookies.get('token')
  if (token) {
    setAuth(true)
    return children
  } else {
    return <Navigate to="/login" />
  }
}
