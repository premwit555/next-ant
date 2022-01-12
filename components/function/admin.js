import axios from 'axios'
import { config } from '../../config'

export const listUser = async (authtoken) => {
  return await axios.get(`${config.backend}/admin/${id}`, {
    headers: { Authorization: `Bearer ${authtoken}` },
  })
}

export const changeStatus = async (authtoken, id, isStatus) => {
  return await axios.patch(`${config.backend}/admin/${id}`, isStatus, {
    headers: { Authorization: `Bearer ${authtoken}` },
  })
}

export const changeRole = async (authtoken, value) => {
  return await axios.post(`${config.backend}/admin/${id}`, value, {
    headers: { Authorization: `Bearer ${authtoken}` },
  })
}

export const removeAdmin = async (authtoken, id) => {
  return await axios.delete(`${config.backend}/admin/${id}`, {
    headers: { Authorization: `Bearer ${authtoken}` },
  })
}

export const resetPassword = async (authtoken, id, values) => {
  return await axios.put(`${config.backend}/admin/${id}`, values, {
    headers: { Authorization: `Bearer ${authtoken}` },
  })
}

export const optionRole = async (authtoken) => {
  return await axios.get(`${config.backend}/type/admin`, {
    headers: { Authorization: `Bearer ${authtoken}` },
  })
}
