import React from 'react';
import { Form, Input, Button, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import request, { HttpPaths } from '../../common/request';
import './login.scss';
import { hashPassword } from '../../common/encrypt';

const { Title } = Typography;

const Login: React.FC = () => {
  const onFinish = (values: { email: string; password: string }) => {
    const { email, password } = values;
    if (!email || !password) {
      console.log('Please input your email and password');
      return;
    }

    const pass = hashPassword(password);
    request
      .post(HttpPaths.LOGIN, { email, password: pass })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <Form name="login" className="login-form" onFinish={onFinish}>
        <Space align="center" direction="vertical" style={{ width: '100%' }}>
          <Title level={3}>Login</Title>
        </Space>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
          <Input type="email" size="large" prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
