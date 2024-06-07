import axios, { AxiosResponse } from "axios";

export default async function postTask (data: string[], token: string): Promise<AxiosResponse<any, any> | boolean> {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const dbResponse = await axios.post('http://localhost:3000/tasks', data, config)
    return dbResponse
  } catch (error) {
    return false   
  }
}