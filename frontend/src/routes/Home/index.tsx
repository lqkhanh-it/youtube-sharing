import React from 'react';
import { List, Card, Row, Col, Typography, Image, Space } from 'antd';
// import ReactPlayer from 'react-player';
import './home.scss';
import { useAppSelector } from '../../store/hooks';
import { selectVideos } from '../../store/slices/video.slice';

const { Title, Text } = Typography;

const HomePage: React.FC = () => {
  const videos = useAppSelector(selectVideos);

  return (
    <div className="home-container">
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={videos}
        renderItem={(video) => (
          <List.Item>
            <Card hoverable className="video-card">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12} lg={10}>
                  <Space
                    align="center"
                    direction="vertical"
                    style={{ width: '100%', height: '100%', justifyContent: 'center' }}
                  >
                    {/* <ReactPlayer url={video?.videoUrl} width="100%" height="200px" /> */}
                    <Image preview={false} src={video?.imgUrl} alt="Video thumbnail" width="100%" />
                  </Space>
                </Col>
                <Col xs={24} md={12} lg={14}>
                  <div className="video-details">
                    <Title level={4} className="video-title">
                      {video.title}
                    </Title>
                    <Text className="video-author">Shared by: {video.author?.email}</Text>
                    <br />
                    <Text type="secondary">
                      {new Date(video.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </Text>
                    <br />
                    <Text className="video-description">{video.description}</Text>
                  </div>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default HomePage;
