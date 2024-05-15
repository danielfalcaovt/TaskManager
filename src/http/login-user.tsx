import axios from 'axios'
import Cookies from 'js-cookie'

export default async function loginUser(email: string, password: string) {
  try {
    const user = await axios.post('http://localhost:3000/login', {
      email,
      password
    })
    console.log(user)
    return user
  } catch (error) {
    console.log(error)
    return false
  }
};
