import serverAPI from '../hooks/useAxios'
import React, { useCallback } from 'react'

import SignUpForm from '../components/SignUpForm'

import { userLogin } from '../redux/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SignUpSection: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    (formInfo: any) => {
      const user = {
        username: formInfo.username,
        email: formInfo.email,
        password: formInfo.password,
        password_confirmation: formInfo.passwordConfirmation,
      }

      serverAPI
        .post(`/users`, { user })
        .then((response) => {
          if (response.data.user) {
            dispatch(userLogin(response.data.user))
            navigate('/')
          } else {
            console.log(response.data.errors)
          }
        })
        .catch((error) => console.log(error))
    },
    [dispatch, navigate]
  )

  return (
    <section className="relative w-3/4 h-full mx-auto xxl:w-1/2">
      <SignUpForm handleSubmit={handleSubmit} />
    </section>
  )
}

export default SignUpSection
