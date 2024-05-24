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
    console.log(response);
    return response
  } catch (error) {
    console.log(error)
    return error
  }
};
