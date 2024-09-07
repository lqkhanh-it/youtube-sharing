import React from 'react';
import { Form, Input, Button, Typography, Space, message } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';
import './share.scss';
import { useAppDispatch } from '../../store/hooks';
import { shareVideo } from '../../store/slices/video.slice';

const { Title } = Typography;

const ShareVideo: React.FC = () => {
  const dispatch = useAppDispatch();
  const onFinish = (values: { url: string }) => {
    const { url } = values;
    if (!url) {
      message.error('Please input your Youtube link!');
      return;
    }

    dispatch(shareVideo(url));
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
