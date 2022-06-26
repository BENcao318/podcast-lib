import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogout } from '../redux/user'
import { ReactComponent as HomeLogo } from '../assets/home.svg'
import { ReactComponent as ListLogo } from '../assets/list.svg'
import { ReactComponent as QueuesLogo } from '../assets/queues.svg'
import { ReactComponent as GridLogo } from '../assets/grid.svg'
import { ReactComponent as PodcastLogo } from '../assets/noun-podcast-26.svg'

const serverURL = 'http://localhost:3000/api/v1'

function SideBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userStatus = useSelector((state) => state.user)

  console.log(userStatus);

  function logout() {
    dispatch(userLogout())
    axios.delete(`${serverURL}/logout`, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_out) {
          console.log(response.data);
        }

      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <aside className='lg:w-60 fixed min-h-screen flex-col z-20 bg-white'>
      <div className='flex items-center cursor-pointer mt-4' onClick={() => navigate('/')}>
        <PodcastLogo className='w-16 h-16 fill-sky-600' />
        <span className='font-semibold text-2xl text-neutral-600'> Podcast Library</span>
      </div>
      <hr className='mt-4 mb-6 border-b-0 border-gray-400' />
      <ul className='w-full font-semibold text-lg text-neutral-600 grid grid-rows-4 place-items-center'>
        <li className='group min-w-full py-3 flex items-center cursor-pointer ml-6'>
          <HomeLogo className='w-6 h-6 inline-block group-hover:fill-sky-600' />
          <Link to='/' className='ml-3 group-hover:text-sky-600'>Home</Link>
        </li>
        <li className='group min-w-full py-3 flex items-center cursor-pointer ml-7'>
          <ListLogo className='w-5 h-5 inline-block group-hover:fill-sky-600' />
          <Link to='/subscriptions' className='ml-3 group-hover:text-sky-600'>Subscriptions</Link>
        </li>
        <li className='group min-w-full py-3 flex items-center cursor-pointer ml-6'>
          <QueuesLogo className='w-6 h-6 inline-block group-hover:fill-sky-600' />
          <Link to='/' className='ml-3 group-hover:text-sky-600'>Queues</Link>
        </li>
        <li className='group min-w-full py-3 flex items-center cursor-pointer ml-6'>
          <GridLogo className='w-6 h-6 inline-block group-hover:fill-sky-600' />
          <Link to='/' className='ml-3 group-hover:text-sky-600'>Browse By Genre</Link>
        </li>
      </ul>
      <hr className='mt-6 mb-6 border-b-0 border-gray-400' />

      <div className='absolute bottom-36 grid w-full'>
        {userStatus.logged_in ?
          <div className='text-center grid'>
            <hr className='mb-2 border-b-0 border-gray-400' />
            <div className='font-semibold text-lg mb-2'>
              Hi, {userStatus.user.username}
            </div>
            <div className='bg-sky-600 w-1/2 self-center px-8 py-2 rounded-lg justify-self-center text-slate-200 font-semibold text-xl cursor-pointer hover:bg-sky-800' onClick={() => {
              navigate('/')
              logout()
            }}>
              Logout
            </div>
            <hr className='mt-2 border-b-0 border-gray-400' />
          </div>
          :
          <div className='bg-sky-600 w-1/2 px-6 py-2 rounded-lg justify-self-center text-slate-200 font-semibold text-xl cursor-pointer hover:bg-sky-800' onClick={() => navigate('/login')}>
            Log in
          </div>

        }
        {/* <span className='cursor-pointer' onClick={logout}>Logout</span> */}
      </div>
    </aside>
  )
}

export default SideBar