import React from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { Dashboard } from '../../pages/dashboard';
import Logo from '../../assets/logoKhai.png';
import { TeachersPage } from '../../pages/teachers';

const { Sider } = Layout;

export const AppLayout: React.FC = () => {
  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <img src={Logo} style={{ width: '200px', height: '200px' }} alt="logo" />
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <NavLink to="/teachers">Teachers</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header />
        <Content>
          <InnerContent>
            <Switch>
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/teachers" exact component={TeachersPage} />
              <Redirect to="/dashboard" />
            </Switch>
          </InnerContent>
        </Content>
        <Footer>KHAI ©2021 Created by Igor Berezhnoi</Footer>
      </Layout>
    </Layout>
  );
};

const Header = styled(Layout.Header)`
  padding: 0;
`;

const Content = styled(Layout.Content)`
  margin: 24px 16px 0;
  overflow-y: auto;
  /* background: red; */
`;

const InnerContent = styled.div`
  padding: 24px;
  min-height: 360px;
  overflow-y: auto;
`;

const Footer = styled(Layout.Footer)`
  text-align: center;
  background: #001529;
  color: #fff;
`;
