import { Router } from 'next/router'
import { config } from '../../config'

const dispatch = useDispatch()

export const getUser = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const user = await axios
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
