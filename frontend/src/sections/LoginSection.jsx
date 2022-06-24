import axios from 'axios'
import React from 'react'
import { userLogin } from '../redux/user'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const serverURL = 'http://localhost:3000/api/v1'

function LoginSection() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountInfo, setAccountInfo] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState()

  function handleInput(e) {
    const value = e.target.value
    setAccountInfo({
      ...accountInfo,
      [e.target.type]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const user = {
      email: accountInfo.email,
      password: accountInfo.password
    }

    axios.post(`${serverURL}/login`, { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          dispatch(userLogin(response.data.user))
          navigate('/')
        } else {
          setError(response.data.error)
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <section className="absolute w-full h-full">
      <div>
        LoginSection
        <Link to='/signup'>
          Signup
        </Link>


      </div>
      <div
        className="absolute top-0 w-full h-full bg-gray-900"
      ></div>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                    type="button"
                  >

                    Github
                  </button>
                  <button
                    className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                    type="button"
                  >
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      autoComplete="email"
                      id="current-email"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Email"
                      onChange={handleInput}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      autoComplete="current-password"
                      id="current-password"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Password"
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                      />
                      <span className="ml-2 text-sm font-semibold text-gray-700">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="button"
                      onClick={() => navigate('/signup')}
                    >
                      Signup
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>


  )
}

export default LoginSection