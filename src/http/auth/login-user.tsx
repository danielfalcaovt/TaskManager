import axios from 'axios'

export default async function loginUser(email: string, password: string) {
  try {
    const userData = {
      email,
      password
    }
    const response = await axios.post('http://localhost:3000/login', userData)
    return response
  } catch (error) {
    console.log(error)
    return error
  }
};
