import axios, { AxiosResponse } from "axios";

export default async function postNotes (data: object, token: string): Promise<AxiosResponse<any, any> | boolean> {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const dbResponse = await axios.post('http://localhost:3000/notes', data, config)
    return dbResponse
  } catch (error) {
    return false
  }
}