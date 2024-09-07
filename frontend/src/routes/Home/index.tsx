import React, { useState, useEffect } from 'react';
import { List, Card, Row, Col, Typography } from 'antd';
import ReactPlayer from 'react-player';
import './home.scss';

const { Title, Text } = Typography;

interface Video {
  id: number;
  url: string;
  title: string;
  description: string;
  sharedBy: string;
  time: string;
}

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const videoData = [
      {
        id: 1,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Awesome Video 1',
        description: 'This is a cool video shared by the community.',
        sharedBy: 'User1',
        time: '2 days ago',
      },
      {
        id: 2,
        url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
        title: 'Amazing Clip 2',
        description: 'Check out this amazing clip. Must watch!',
        sharedBy: 'User2',
        time: '5 hours ago',
      },
      {
        id: 3,
        url: 'https://www.youtube.com/watch?v=l9PxOanFjxQ',
        title: 'Cool Video 3',
        description: 'Another cool video for you to enjoy.',
        sharedBy: 'User3',
        time: '1 week ago',
      },
    ];
    setVideos(videoData);
  }, []);

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
                  <div className="thumbnail-wrapper">
                    <ReactPlayer url={video.url} width="100%" height="200px" />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={14}>
                  <div className="video-details">
                    <Title level={4} className="video-title">
                      {video.title}
                    </Title>
                    <Text className="video-description">{video.description}</Text>
                    <div className="video-meta">
                      <Text type="secondary">{video.time}</Text>
                      <br />
                      <Text className="video-author">Shared by: {video.sharedBy}</Text>
                    </div>
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
