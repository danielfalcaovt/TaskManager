/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'

export default async function registerUser(username:string, email: string, password: string, confirmPassword: string) : Promise<AxiosResponse<any, any> | any> {
  try {
    const userData = {
      username,
      email,
      password,
      confirmPassword
    }
    const response = await axios.post('http://localhost:3000/register', userData)
    return response
  } catch (error) {
    return error
  }
};
