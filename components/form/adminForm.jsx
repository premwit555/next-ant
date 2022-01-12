import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, Switch } from 'antd'
import { optionRole } from '../function/admin'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { config } from '../../config'
import useSWR from 'swr'
function AdminForm() {
  const { Option } = Select

  const getApi = () => axios.get().then((res) => res.data.result)
  const { data } = useSWR(`${config.backend}/type/admin`, getApi)

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  return (
    <>
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
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="ยูสเซอร์เนม" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="รหัสผ่าน" />
        </Form.Item>
        <Form.Item label="role" name="role">
          <Select defaultValue="กรุณาเลือกตำแหน่ง">
            {data ? (
              data.map((res) => {
                return <Option value={res.code}>{res.name}</Option>
              })
            ) : (
              <></>
            )}
          </Select>
        </Form.Item>
        <Form.Item label="status" name="isStatus">
          <Switch defaultChecked />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default AdminForm
