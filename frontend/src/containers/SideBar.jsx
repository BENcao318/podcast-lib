import React from 'react'
import { Link } from 'react-router-dom'

function SideBar() {
  return (
    <aside className='lg:w-1/6 bg-gray-400 min-h-screen'>
      <div>
        SideBar
        <Link to='/'>
          Home
        </Link>
        <Link to='/search'>
          Search
        </Link>
        <Link to='/test'>
          Test
        </Link>
      </div>
    </aside>
  )
}

export default SideBar