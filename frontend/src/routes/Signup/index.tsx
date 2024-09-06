import React from 'react';
import { Form, Input, Button, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import request, { HttpPaths } from '../../common/request';
import './signup.scss';
import { hashPassword } from '../../common/encrypt';

const { Title } = Typography;

const SignUp: React.FC = () => {
  const onFinish = (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { name, email, password, confirmPassword } = values;

    if (!name || !email || !password || !confirmPassword) {
      console.log('Please complete all fields');
      return;
    }

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    const hashedPassword = hashPassword(password);

    request
      .post(HttpPaths.SIGNUP, { name, email, password: hashedPassword })
      .then((res) => {
        console.log('User registered successfully:', res);
      })
      .catch((err) => {
        console.log('Error during sign-up:', err);
      });
  };

  return (
    <div className="signup-container">
      <Form name="signup" className="signup-form" onFinish={onFinish}>
        <Space align="center" direction="vertical" style={{ width: '100%' }}>
          <Title level={3}>Sign Up</Title>
        </Space>

        <Form.Item name="name" rules={[{ required: true, message: 'Please input your Name!' }]}>
          <Input size="large" prefix={<UserOutlined />} placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your Email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          {/* use another icon */}
          <Input type="email" size="large" prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" className="signup-form-button">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
