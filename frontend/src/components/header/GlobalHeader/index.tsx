import React from 'react';
import { Layout, Typography, Space } from 'antd';
import './header.scss';
import { HomeFilled } from '@ant-design/icons';
import MenuRight from '../MenuRight';

const { Header } = Layout;
const { Title } = Typography;

const GlobalHeader = () => (
  <Header className="global-header">
    <Space align="center">
      <HomeFilled style={{ fontSize: 40 }} />
      <Title level={3} className="brand-name">
        Funny Movies
      </Title>
    </Space>
    <MenuRight />
  </Header>
);

export default GlobalHeader;
