/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

export default async function getNotifications(token: string | undefined): Promise<any> {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const dbResponse = await axios.get('http://localhost:3000/notification', config)
    return dbResponse
  } catch (error) {
    return false
  }
}