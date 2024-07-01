/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'

interface IUserData {
  email: string
  password: string
}

export default async function loginUser(data: IUserData): Promise<AxiosResponse<any, any> | any> {
  try {
    const response = await axios.post('http://localhost:3000/login', data)
    return response
  } catch (error) {
    return error
  }
};
