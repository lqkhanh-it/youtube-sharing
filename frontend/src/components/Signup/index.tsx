import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, Space, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { ERequestStatus } from '../../common/request';
import './signup.scss';
import { hashPassword } from '../../common/encrypt';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  createUser,
  resetUserStatus,
  selectStatus,
  selectUser,
} from '../../store/slices/user.slice';

const { Title } = Typography;

const SignUp: React.FC<{ callback: () => void }> = ({ callback }) => {
  const [form] = Form.useForm();
  const userStatus = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) {
      callback();
    }
  }, [user, callback]);

  useEffect(() => {
    form.resetFields();
  }, []);

  useEffect(() => {
    setLoading(false);
    switch (userStatus) {
      case ERequestStatus.IDLE:
        break;
      case ERequestStatus.LOADING:
        setLoading(true);
        break;
      case ERequestStatus.SUCCEEDED:
        message.success('User created successfully');
        window.location.reload();
        if (callback) {
          callback();
        }
        break;
      case ERequestStatus.FAILED:
        break;
      default:
        return undefined;
    }
    return () => {
      setLoading(false);
      dispatch(resetUserStatus());
    };
  }, [userStatus, callback]);

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
    dispatch(createUser({ name, email, password: hashedPassword }));
    setLoading(true);
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
          <Input type="email" size="large" prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            disabled={loading}
            size="large"
            prefix={<LockOutlined />}
            placeholder="Password"
          />
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
          <Input.Password
            disabled={loading}
            size="large"
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            size="large"
            type="primary"
            htmlType="submit"
            className="signup-form-button"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
