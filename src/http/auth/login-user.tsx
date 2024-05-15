import axios from 'axios'

export default async function loginUser(email: string, password: string) {
  try {
    const userData = {
      email,
      password
    }
    const response = await axios.post('http://localhost:3000/login', userData)
    if (response.statusText === 'OK') {
      return response.data
    }else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
};
