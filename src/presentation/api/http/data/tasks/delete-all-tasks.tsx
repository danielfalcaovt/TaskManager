/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

export default async function deleteAllTasks(token: string | undefined, userId: string, sure: boolean): Promise<any> {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    if (sure) {
        const dbResponse = await axios.delete(`http://localhost:3000/tasks/${userId}/1/all`, config)
        return dbResponse
    } else {
        return false
    }
  } catch (error) {
    return false
  }
}