import axios from "axios"

export default async function getNotifications(token: string): Promise<any> {
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