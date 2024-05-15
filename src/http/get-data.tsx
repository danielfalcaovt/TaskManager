import axios, { AxiosResponse } from 'axios'

export default async function getData (token: string): Promise<AxiosResponse<any, any> | boolean> {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const dbResponse = await axios.get(
      'http://192.168.1.67:8080/api',
      config
    )
    return dbResponse
  } catch (error) {
    console.error(error)
    return false
  }
}
