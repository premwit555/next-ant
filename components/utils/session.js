import withIronSession from 'next-iron-session'
import { config } from '../../config'

export default function withSession(handler) {
  return withIronSession(handler, {
    password: config.cookiePassword,
    cookieName: config.cookieName,
    cookieOptions: {
      secure: false,
    },
  })
}
