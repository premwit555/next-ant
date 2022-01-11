import axios from 'axios'
import Router from 'next/router'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { config } from '../../config'
import { Login } from '../auth/authSlice'

function MemberLayout(props) {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.backofficeToken
    const getUser = () => {
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      const user = axios
        .get(`${config.backend}/auth/me`, {
          headers,
        })
        .then((res) => {
          const { username, role } = res.data.data
          dispatch(
            Login({
              token,
              role,
              username,
            })
          )

          return res.data.data
        })
        .catch((e) => {
          console.log(e)
          Router.push('/auth/login')
        })
    }
    getUser()
  }, [])

  return <>{props.children}</>
}

export default MemberLayout
