import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/data/data-context";
import getUser from "../../http/data/users/get-user";
import Cookies from 'js-cookie'

export default function ProfileButton() {
  const { data, setData } = useContext(DataContext)
  const jwt = Cookies.get('token')
  async function handleUser() {
    const user = await getUser(jwt)
    setData(user)
  }

  return (
    <Link to='profile' className="button" id="profile-button" onClick={handleUser}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
      </svg>
    </Link>
  )
}