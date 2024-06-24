import axios from "axios"

export default async function deleteTasks(token: string, userId: string, taskId: string): Promise<any> {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const dbResponse = await axios.delete(`http://localhost:3000/tasks/${userId}/${taskId}`, config)
    console.log(dbResponse)
    return dbResponse
  } catch (error) {
    return false
  }
}