import React from 'react'
import { Form, Input, Button, Select, Switch } from 'antd'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { config } from '../../config'
import useSWR from 'swr'
function AdminForm() {
  // UI
  const { Option } = Select

  // API GET
  const { token } = useSelector((state) => state.auth)
  console.log(token)
  const getApi = (key) => axios.get(key).then((res) => res.data.result)
  const { data } = useSWR(`${config.backend}/type/admin`, getApi)
  // API POST

  // END
  const onFinish = async (values) => {
    console.log(values)
    const configs = {
      headers: { Authorization: `Bearer ${token}` },
    }

    await axios
      .post(`${config.backend}/admin`, values, configs)
      .then((res) => res.data)
      .catch((e) => console.log(e))
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
          label="Nane"
          name="name"
          rules={[{ required: true, message: 'กรุณากรอก ชื่อเล่น' }]}
        >
          <Input placeholder="ชื่อเล่น" />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'กรุณากรอก  ' }]}
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
          <Switch />
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
