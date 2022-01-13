import { Col, Row } from 'antd'
import React from 'react'
import AdminForm from '../../components/Form/AdminForm'
import AdminTable from '../../components/Table/AdminTable'
import MemberLayout from '../../layouts/MemberLayout'

function Admin() {
  return (
    <MemberLayout>
      <Row>
        <Col span={8} offset={1}>
          <AdminForm />
        </Col>
        <Col span={11} offset={2}>
          <AdminTable />
        </Col>
      </Row>
    </MemberLayout>
  )
}

export default Admin
