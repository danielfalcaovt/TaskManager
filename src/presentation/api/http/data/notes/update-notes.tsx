/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";

export default async function updateNotes (data: object, token: string | undefined): Promise<AxiosResponse<any, any> | boolean> {
  try {
    if (!token) {
      return false
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const dbResponse = await axios.patch('http://localhost:3000/notes', data, config)
    return dbResponse
  } catch (error) {
    return false
  }
}