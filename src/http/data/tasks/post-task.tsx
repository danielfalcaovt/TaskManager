import axios, { AxiosResponse } from "axios";

interface taskQuery {
  user_id: string | undefined,
  taskName : string | undefined,
  taskText : string | undefined,
  taskDay: string | undefined | number,
  taskMonth: number | undefined
}

export default async function postTask (data: taskQuery, token: string | undefined): Promise<AxiosResponse<any, any> | boolean> {
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