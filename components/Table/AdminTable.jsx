/* eslint-disable react-hooks/rules-of-hooks */
import { message, Popconfirm, Radio, Row, Switch, Table } from 'antd'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { useMutation, useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { apiAdmin } from '../../hooks/apiAdmin'
import { apiType } from '../../hooks/apiType'
import { ErrorToast } from '../Toast/ErrorToast'
import { SuccessToast } from '../Toast/SuccessToast'

function AdminTable() {
  const { token } = useSelector((state) => state.auth)

  console.log('token--> ', { token })

  const { data } = useQuery('Admins', () => apiAdmin._getList({ token }))

  // get role
  const { data: typeAdmin } = useQuery('roleAdmin', () =>
    apiType._getType({ type: 'admin', token })
  )

  // update status
  const apiUpdate = useMutation(apiAdmin._updateById, {
    onSuccess: (dataStatus) => {
      const message = ` อัพเดต สถานะ สำเร็จ `
      SuccessToast(message)
      queryClient.refetchQueries()
    },
    onError: (error) => {
      ErrorToast(error.message)
    },
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
      filters: typeAdmin
        ? typeAdmin.map((item) => {
            return {
              text: item.name,
              value: item.name,
            }
          })
        : '',
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

  function handleDelete(e, id) {
    removeAdmin(token, id)
    message.success('Click on Yes')
  }
  const handleOnchange = (e, _id) => {
    console.log(_id)
    const doc = { isStatus: e }
    // api
    const update = apiUpdate.mutate({ id: _id, doc, token })
    console.log(update)
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  return (
    <div>
      <Table
        rowKey={(record) => record._id}
        columns={adminColumns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  )
}

export default AdminTable
