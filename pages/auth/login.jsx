import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  message,
  Skeleton,
  Spin,
  Alert,
} from 'antd'
import axios from 'axios'
import { config } from '../../config'
import { useDispatch } from 'react-redux'
import { Login } from '../../components/auth/authSlice'
import Router from 'next/router'

function login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

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

export default login
