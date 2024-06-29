/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

export default async function getNotes (token: string | undefined): Promise<any> {
  try {
    if (!token) {
      return false
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const dbResponse = await axios.get('http://localhost:3000/notes', config)
    return dbResponse
  } catch (error) {
    return false
  }
}