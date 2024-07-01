/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Navigate } from 'react-router'
import Cookies from 'js-cookie'

export default function RotasProtegidas({ children }: any) {
  const token = Cookies.get('token')

  if (token) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}
