import React, { useState } from 'react';
import {Layout, Menu, Breadcrumb, Switch} from 'antd';
import {
    SearchOutlined,
    ContainerOutlined,
} from '@ant-design/icons';
import {
    BrowserRouter as Router
} from "react-router-dom";
import 'antd/dist/antd.css';
import './App.css'
import {Route} from "react-router";

const { Header, Content, Footer, Sider } = Layout;


function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Співробітиники', '1', <SearchOutlined />),
  getItem('Контакти', '2', <ContainerOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
      <Router>
          <div className='app'>
              <Layout
                  style={{
                      minHeight: '100vh',
                  }}
              >
                  <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                      <div className="logo" />
                      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                  </Sider>
                  <Layout className="site-layout">
                      <Header
                          className="site-layout-background"
                          style={{
                              padding: 0,
                          }}
                      />
                      <Content
                          style={{
                              margin: '0 16px',
                          }}
                      >
                          <Breadcrumb
                              style={{
                                  margin: '16px 0',
                              }}
                          >
                              <Breadcrumb.Item>User</Breadcrumb.Item>
                              <Breadcrumb.Item>Bill</Breadcrumb.Item>
                          </Breadcrumb>
                          <Switch>
                              <Route path='/employee'>
                                  <div
                                      className="site-layout-background"
                                      style={{
                                          padding: 24,
                                          minHeight: 360,
                                      }}
                                  >
                                      Ссторінка співробітників
                                  </div>
                              </Route>
                              <Route path='/contacts'>
                                  <div
                                      className="site-layout-background"
                                      style={{
                                          padding: 24,
                                          minHeight: 360,
                                      }}
                                  >
                                      Ссторінка контактів
                                  </div>
                              </Route>
                          </Switch>
                      </Content>
                      <Footer
                          style={{
                              textAlign: 'center',
                          }}
                      >
                          Адвокатське бюро 2022 created by Roman Melnyk PI-60
                      </Footer>
                  </Layout>
              </Layout>
          </div>
      </Router>
  );
};

export default App;