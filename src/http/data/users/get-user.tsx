import axios from 'axios'

export default async function getUser (token: string) {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const dbResponse = await axios.get('http://localhost:3000/user', config)
    return dbResponse
  } catch (error) {
    return false
  }
}