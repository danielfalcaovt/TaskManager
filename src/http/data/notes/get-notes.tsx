import axios from 'axios'

export default async function getNotes (token: string) {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const dbResponse = await axios.post('http://localhost:3000/notes', config)
    return dbResponse
  } catch (error) {
    return false
  }
}