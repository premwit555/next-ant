import axios from 'axios'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Login } from '../functions/auth/authSlice'
import { Layout, Menu } from 'antd'
import { menuList } from '../menu'
import Link from 'next/link'
import { config } from '../config'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

function MemberLayout(props) {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.backofficeToken
    const getUser = () => {
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      const user = axios
        .get(`${config.backend}/auth/me`, {
          headers,
        })
        .then((res) => {
          const { username, role } = res.data.data
          dispatch(Login({ token, role, username }))
          return
        })
        .catch((e) => {
          console.log(e)
          Router.push('/auth/login')
        })
    }

    getUser()
  }, [])
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }

  const MenuLsit = menuList.map((menu) => {
    if (menu.SubMenu) {
      return (
        <SubMenu key={menu.key} icon={menu.icon} title={menu.name}>
          {menu.SubMenu.map((sub) => {
            return (
              <Menu.Item key={sub.key} icon={sub.icon}>
                <Link href={sub.path}>{sub.name}</Link>
              </Menu.Item>
            )
          })}
        </SubMenu>
      )
    }
    if (!menu.SubMenu) {
      return (
        <Menu.Item key={menu.key} icon={menu.icon}>
          <Link href={menu.path}>{menu.name}</Link>
        </Menu.Item>
      )
    }
  })

  return (
    <>
      <Header
        className="site-layout-background"
        style={{ padding: 0, height: '80px' }}
      />
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
        >
          <div className="logo" />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            {MenuLsit}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ padding: '40px' }}>{props.children}</Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default MemberLayout
