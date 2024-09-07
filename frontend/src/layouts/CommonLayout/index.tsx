import React from 'react';
import { Layout } from 'antd';
import './common-layout.scss';
import GlobalHeader from '../../components/header/GlobalHeader';

const { Content, Footer } = Layout;

interface CommonLayoutProps {
  children: React.ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  console.log('layout');
  return (
    <Layout className="layout">
      <GlobalHeader />

      <Content className="content">
        <div className="site-layout-content">{children}</div>
      </Content>

      <Footer className="footer">©2024 MyBrand. All rights reserved.</Footer>
    </Layout>
  );
};

export default CommonLayout;
