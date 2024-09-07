import React, { useEffect } from 'react';
import { notification } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';
import wsHelper, { WSMessageType } from '../../common/websocket';
import { addVideo, Video } from '../../store/slices/video.slice';
import { useAppDispatch } from '../../store/hooks';

const WebSocketComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  const [api, contextHolder] = notification.useNotification({
    stack: { threshold: 3 },
    showProgress: true,
  });

  const openNotification = (video: Video) => {
    api.open({
      message: `${video.author.name} shared a new video!`,
      icon: <YoutubeOutlined />,
      description: video.title.length > 100 ? `${video.title.substring(0, 100)}...` : video.title,
    });
  };

  useEffect(() => {
    console.log('Connecting to WebSocket...');
    wsHelper.connect((message) => {
      const str = message.data.toString();
      const [type, data] = str.split('::') as [WSMessageType, string];

      switch (type) {
        case WSMessageType.VIDEO_UPDATE:
          dispatch(addVideo(JSON.parse(data)));
          break;
        case WSMessageType.NOTIFICATION:
          openNotification(JSON.parse(data));
          break;
        default:
      }
    });
  }, []);

  return <div style={{ display: 'none' }}>{contextHolder}</div>;
};

export default WebSocketComponent;
