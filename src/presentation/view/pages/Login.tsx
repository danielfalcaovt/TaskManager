/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react"
import loginUser from "../../api/http/auth/login-user"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom"
import { DataContext } from "../../../infrastructure/context/data/data-context"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'

export default function Login() {
  const { data, setData } = useContext(DataContext)
  const [token, setToken] = useState<string | undefined>()
  const [hasError, setError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const navigate = useNavigate()
  const schema = yup.object().shape({
    email: yup.string().required('Todos os campos são obrigatórios.'),
    password: yup.string().required('Todos os campos são obrigatórios.')
  })
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

  async function handleAuth(data: any, evt: any) {
    evt.preventDefault()
     if (!hasError) {
      const user : any = await loginUser(data)
      if (user.status === 200) {
        setData((oldValue : any) => {
          return {
            ...oldValue,
            user: user.data
          }
        })
        navigate('/')
        Cookies.set('user', user.data.user.id, { expires: 0.3 })
        const jwt = Cookies.set('token', user.data.token, { expires: 0.3 })
        setToken(jwt)
      } else {
        setError(true)
        setErrorText(user.response.data)
      }
    }
  }

  function showPassword() {
    const passwordInput : any = document.querySelector("#password-input-element")
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'
    } else {
      passwordInput.type = 'password'
    }
  }
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <>
      {hasError ?
        <div className="error-container" style={hasError ? { display: 'flex' } : {}}>
          <div onClick={() => { setError(false) }} className="error-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f83232d2" className="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </div>
          <div className="error-title">
            <h1>{errorText.toUpperCase()}</h1>
          </div>
        </div>
        : ""}
      <div id="login-container">
        <div className="bg-gradient gradient-1">

        </div>
        <div className="bg-gradient gradient-2">

        </div>
        <main id="login-page">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(handleAuth)} id="login-form" method="POST" >
            <div className="email-input">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="white" fill="none">
                  <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <input required type="text" placeholder="E-mail" { ...register('email') }></input>
            </div>
            <div className="password-input">
              <div id="password-input-h">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="white" fill="none">
                  <path d="M14.491 15.5H14.5M9.5 15.5H9.50897" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12105 13.2453 4 14.3624 4 15.5C4 16.6376 4.12105 17.7547 4.26781 18.8447Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input required type="password" placeholder="Password" id="password-input-element" { ...register('password') }></input>
              <div onClick={showPassword} id="show-password">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
              </div>
            </div>
            <div className="login-link">
              <Link to='/register'>Aren't Registered?</Link>
            </div>
            <button id="send-button">Login</button>
          </form>
        </main>
      </div>
    </>
  )
};
