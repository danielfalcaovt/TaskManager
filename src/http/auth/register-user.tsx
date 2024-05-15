import axios from 'axios'

export default async function registerUser(username:string, email: string, password: string, confirmPassword: string) {
  try {
    const userData = {
      username,
      email,
      password,
      confirmPassword
    }
    const response = await axios.post('http://localhost:3000/register', userData)
    if (response.statusText === 'OK') {
      return response.data
    }else if (response.status === 400) {
      return response.message
    }else {
      return false
    }
  } catch (error) {
    return 'Internal Server Error.'
  }
};
