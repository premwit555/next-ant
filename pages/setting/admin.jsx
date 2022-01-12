import {
  Col,
  message,
  Popconfirm,
  Radio,
  Row,
  Select,
  Switch,
  Table,
} from 'antd'
import axios from 'axios'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import useSWR from 'swr'
import { changeStatus, removeAdmin } from '../../components/function/admin'
import MemberLayout from '../../components/layouts/MemberLayout'
import { config } from '../../config'
import { FiEdit } from 'react-icons/fi'
import AdminForm from '../../components/form/adminForm'

const getApi = ({ url, authtoken }) =>
  axios
    .get(url, {
      headers: { Authorization: `Bearer ${authtoken}` },
    })
    .then((res) => res.data.result)

export default function Admin() {
  // use store
  const user = useSelector((state) => state.auth)
  const authtoken = user.token

  const url = `${config.backend}/admin`
  const { data, error } = useSWR({ url, authtoken }, getApi, {
    refreshInterval: 500,
  })

  const adminColumns = [
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        a.name?.length - b.name?.length
      },
    },
    {
      title: 'หน้าที่',
      dataIndex: 'role',
      filters: [
        {
          text: 'แอดมิน',
          value: 'แอดมิน',
        },
        {
          text: 'การตลาด',
          value: 'การตลาด',
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },

    {
      title: 'สถานะ',
      dataIndex: 'isStatus',
      render: (isStatus, record) => (
        <Switch
          checked={isStatus}
          onChange={(e) => handleOnchange(e, record._id)}
        />
      ),
    },
    {
      title: 'แก้ไขข้อมูล',
      dataIndex: '_id',
      render: (isStatus, record) => (
        <Row>
          <Radio.Group>
            <Radio.Button type="primary">
              <FiEdit />
            </Radio.Button>
            <Popconfirm
              title={`คุณแน่ใจว่าจะลบ แอดมิน ${record.name}`}
              onConfirm={(e) => handleDelete(e, record._id)}
              okText="ยืนยัน"
              cancelText="ยกเลิก"
            >
              <Radio.Button type="primary" danger>
                <AiOutlineDelete />
              </Radio.Button>
            </Popconfirm>
          </Radio.Group>
        </Row>
      ),
    },
  ]
  // table  function

  const { Option } = Select

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  function handleDelete(e, id) {
    removeAdmin(user.token, id)
    message.success('Click on Yes')
  }
  const handleOnchange = (e, id) => {
    const value = {
      isStatus: e,
    }
    changeStatus(user.token, id, value)
      .then((res) => {
        message.success('อัพเดตสำเร็จ')
      })
      .catch((err) => {
        message.error(err.response)
      })
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <MemberLayout>
      <Row>
        <Col span={8} offset={1}>
          <AdminForm />
        </Col>
        <Col span={11} offset={2}>
          <Table
            rowKey={(record) => record._id}
            columns={adminColumns}
            dataSource={data}
            onChange={onChange}
          />
        </Col>
      </Row>
    </MemberLayout>
  )
}
