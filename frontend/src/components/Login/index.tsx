import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, Space, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { ERequestStatus } from '../../common/request';
import './login.scss';
import { hashPassword } from '../../common/encrypt';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  loginUser,
  resetUserStatus,
  selectStatus,
  selectUser,
} from '../../store/slices/user.slice';

const { Title } = Typography;

const Login: React.FC<{ callback: () => void }> = ({ callback }) => {
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
        message.success('Login successfully');
        form.resetFields();
        window.location.reload();
        if (callback) {
          callback();
        }
        break;
      case ERequestStatus.FAILED:
        message.error('Login failed! Please check your email and password');
        break;
      default:
        return undefined;
    }
    return () => {
      dispatch(resetUserStatus());
      setLoading(false);
    };
  }, [userStatus, callback, dispatch]);

  const onFinish = (values: { email: string; password: string }) => {
    const { email, password } = values;
    if (!email || !password) {
      console.log('Please input your email and password');
      return;
    }

    const hashedPassword = hashPassword(password);
    dispatch(loginUser({ email, password: hashedPassword }));
    setLoading(true);
  };

  return (
    <div className="login-container">
      <Form name="login" className="login-form" onFinish={onFinish} form={form}>
        <Space align="center" direction="vertical" style={{ width: '100%' }}>
          <Title level={3}>Login</Title>
        </Space>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
          <Input
            disabled={loading}
            type="email"
            size="large"
            prefix={<MailOutlined />}
            placeholder="Email"
          />
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

        <Form.Item>
          <Button
            loading={loading}
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
