import { Col, Row } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useSWR from 'swr'
import MemberLayout from '../../components/layouts/MemberLayout'
import { config } from '../../config'

const getApi = ({ url, authtoken }) =>
  axios
    .get(url, {
      headers: { Authorization: `Bearer ${authtoken}` },
    })
    .then((res) => res.data)



export default function Admin() {
 
  const [state, setState] = useState()

  const url = `${config.backend}/admin`
  const authtoken = useSelector((state) => state.auth.token)
  console.log('-->', authtoken)
  const { data, error } = useSWR({ url, authtoken }, getApi)
  console.log('-->', data)

  return (
    <MemberLayout>
      <Row>
        <Col span={12}></Col>
        <Col span={12}></Col>
      </Row>
    </MemberLayout>
  )
}
