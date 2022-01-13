import { Button, Form, Input, Select, Switch } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'

import { apiAdmin } from '../../hooks/apiAdmin'
import { apiType } from '../../hooks/apiType'
import { ErrorToast } from '../Toast/ErrorToast'
import { SuccessToast } from '../Toast/SuccessToast'

export function AdminForm() {
  const [formAdmin] = Form.useForm()
  const { token } = useSelector((state) => state.auth)
  const { Option } = Select

  const queryClient = useQueryClient()

  const apiCreate = useMutation(apiAdmin._create, {
    onSuccess: (data) => {
      const message = `ลงทะเบียน แอดมิน สำเร็จ`
      SuccessToast(message)
      formAdmin.resetFields()
      queryClient.refetchQueries()
    },
    onError: (error) => {
      ErrorToast(error.message)
    },
  })

  const { data } = useQuery('roleAdmin', () =>
    apiType._getType({ type: 'admin', token })
  )
  const onFinish = async (doc) => {
    apiCreate.mutate({ doc, token })
  }

  return (
    <div>
      <Form
        form={formAdmin}
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
            {data
              ? data.map((i) => (
                  <Option key={i._id} value={i.code}>
                    {i.name}
                  </Option>
                ))
              : ''}
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
    </div>
  )
}

export default AdminForm
