/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";

interface notesData {
  noteId: string
  userId: string
}

export default async function deleteNotes (data: notesData, token: string | undefined): Promise<AxiosResponse<any, any> | boolean> {
  try {
    if (!token) {
      return false
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const dbResponse = await axios.delete(`http://localhost:3000/notes/${data.noteId}/${data.userId}`, config)
    console.log(dbResponse);
    return dbResponse
  } catch (error) {
    return false
  }
}