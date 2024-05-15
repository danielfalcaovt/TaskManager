/* eslint-disable react/prop-types */
import { Navigate } from 'react-router'
import { useContext } from 'react'
import { authContext } from '../context/auth/auth-context'

export default function RotasProtegidas ({ children }) {
  const { auth } = useContext(authContext)
  return auth ? children : <Navigate to="/login" />
}
