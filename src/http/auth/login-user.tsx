import axios, { AxiosResponse } from 'axios'

export default async function loginUser(email: string, password: string): Promise<AxiosResponse<any, any> | any> {
  try {
    const userData = {
      email,
      password
    }
    const response = await axios.post('http://localhost:3000/login', userData)
    return response
  } catch (error) {
    return error
  }
};
