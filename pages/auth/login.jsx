import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Row, Col, message, Spin } from 'antd'
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { Login } from '../../functions/auth/authSlice'
import Router from 'next/router'
import { config } from '../../config'

export function LoginPage() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.backofficeToken
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    setLoading(true)
    const user = axios
      .get(`${config.backend}/auth/me`, {
        headers,
      })
      .then((res) => {
        const { username, role } = res.data.data

        dispatch(Login({ token, role, username }))
        Router.push('/')
        setLoading(false)
        return
      })
      .catch((e) => {
        setLoading(false)
        console.log(e)
      })
  }, [])

  const onFinish = async (data) => {
    setLoading(true)
    const res = await axios
      .post(`${config.backend}/auth/login`, data)
      .then((res) => {
        setLoading(false)
        message.success('เข้าสู่ระบบสำเร็จ')
        return res.data
      })
      .catch((e) => {
        setLoading(false)
        return message.error('กรุณาลองใหม่')
      })

    const token = res.accessToken
    localStorage.backofficeToken = token
    dispatch(Login({ token }))
    Router.push('/')
  }

  return (
    <div>
      <Row justify="center">
        <Col style={{ marginTop: '100px' }}>
          {loading ? (
            <Spin tip="กำลังโหลดหน้า..."></Spin>
          ) : (
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage
