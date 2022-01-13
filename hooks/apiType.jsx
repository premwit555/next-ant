import axios from 'axios'
import { config } from '../config'

export const _getList = async (token) => {
  const data = await axios
    .get(`${config.backend}/type`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((e) => handleResponseError(e))
  return data.result
}

export const _getType = async ({ type, token }) => {
  const data = await axios
    .get(`${config.backend}/type/${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((e) => handleResponseError(e))
  return data.result
}

export const apiType = {
  _getList,
  _getType,
}
