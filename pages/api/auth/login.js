// pages/api/login.ts

import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import { config } from '../../../config'

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    // get user from database then:

    const { username, password } = await req.body

    if (!username && !password) {
      res.json('กรุณากรอกข้อมูลให้ครบถ้วย')
      return
    }

    const data = await axios.post(`${config.backend}/auth.login`, {
      username,
      password,
    })

    if (data.code == 400) {
      res.status(data.code).json(data?.msg)
      return
    }

    req.session.set('user', data)
    await req.session.save()
    res.json({
      isLoggedIn: true,
      ...data,
    })
  },
  {
    cookieName: config.cookieName,
    password: config.cookiePassword,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  }
)
