/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

interface taskQuery {
  userId: string | undefined,
  taskDay: string | undefined | number,
  taskMonth: number | undefined
}

export default async function getSpecificTask (data: taskQuery, token: string | undefined): Promise<any> {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const dbResponse = await axios.post('http://localhost:3000/tasks/filter', data, config)
    return dbResponse
  } catch (error) {
    
    return false   
  }
}