/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

export default async function deleteAllTasks(token: string | undefined, userId: string): Promise<any> {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const dbResponse = await axios.delete(`http://localhost:3000/tasks/${userId}/all`, config)
    console.log(dbResponse)
    return dbResponse
  } catch (error) {
    return false
  }
}