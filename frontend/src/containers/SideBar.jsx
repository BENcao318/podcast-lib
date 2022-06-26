import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../redux/user'
import { useCookies } from 'react-cookie'

const serverURL = 'http://localhost:3000/api/v1'

function SideBar() {
  const dispatch = useDispatch()
  const [cookies, setCookie, removeCookie] = useCookies(['_session_id']);

  function logout() {
    dispatch(userLogout())
    axios.delete(`${serverURL}/logout`, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_out) {
          console.log(response.data);
          removeCookie()
        }

      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <aside className='lg:w-2/12 fixed bg-gray-400 min-h-screen'>
      <div>
        SideBar
        <Link to='/'>
          Home
        </Link>
        <Link to='/search'>
          Search
        </Link>
        <Link to='/subscriptions'>
          Subscription
        </Link>
        <Link to='/login'>
          Login
        </Link>
        <span className='cursor-pointer' onClick={logout}>Logout</span>

      </div>
    </aside>
  )
}

export default SideBar