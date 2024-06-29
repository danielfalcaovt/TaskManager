/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

export default async function getTasks(token: string | undefined): Promise<any> {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const dbResponse = await axios.get('http://localhost:3000/tasks', config)
    return dbResponse
  } catch (error) {
    return false
  }
}