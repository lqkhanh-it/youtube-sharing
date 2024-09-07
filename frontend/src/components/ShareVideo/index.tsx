import React from 'react';
import { Form, Input, Button, Typography, Space, message } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';
import request, { HttpPaths } from '../../common/request';
import './share.scss';
import { hashPassword } from '../../common/encrypt';

const { Title } = Typography;

const ShareVideo: React.FC<{ callback: () => void }> = ({ callback }) => {
  const onFinish = (values: { email: string; password: string }) => {
    const { email, password } = values;
    if (!email || !password) {
      message.error('Please input your email and password');
      return;
    }

    const pass = hashPassword(password);
    request
      .post(HttpPaths.LOGIN, { email, password: pass })
      .then((res) => {
        console.log(res);
        if (callback) {
          callback();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="share-container">
      <Form name="share" className="share-form" onFinish={onFinish}>
        <Space align="center" direction="vertical" style={{ width: '100%' }}>
          <Title level={3}>Share Video</Title>
        </Space>
        <Form.Item
          name="url"
          rules={[{ required: true, message: 'Please input your Youtube link!' }]}
        >
          <Input size="large" prefix={<YoutubeOutlined />} placeholder="Youtube URL" />
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" className="share-form-button">
            Share Video Now!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShareVideo;
