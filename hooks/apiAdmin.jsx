/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import { config } from '../config'
import { handleResponseError } from './handleError'

export const _getList = async ({ token }) => {
 
  const data = await axios
    .get(`${config.backend}/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data.result)
    .catch((e) => handleResponseError(e))
  return data
}

export const _removeById = async ({ _id, token }) => {
  const data = await axios
    .delete(`${config.backend}/admin/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data.result)
    .catch((e) => handleResponseError(e))
  return data
}

export const _getById = async ({ _id, token }) => {
  const data = await axios
    .get(`${config.backend}/admin/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data.result)
    .catch((e) => handleResponseError(e))
  return data
}

export const _updateById = async ({ _id, doc, token }) => {
  const data = await axios
    .patch(`${config.backend}/admin/${_id}`, doc, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data.result)
    .catch((e) => handleResponseError(e))
  return data
}

export const _create = async ({ doc, token }) => {
  const data = await axios
    .post(`${config.backend}/admin`, doc, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((e) => handleResponseError(e))
  return data
}

export const apiAdmin = {
  _create,
  _getById,
  _getList,
  _removeById,
  _getById,
}
