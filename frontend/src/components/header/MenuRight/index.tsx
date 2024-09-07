import { Space } from 'antd';
import React from 'react';
import LoginModal from '../../modal/LoginModal';
import SignupModal from '../../modal/SignupModal';
import ShareVideoModal from '../../modal/ShareVideoModal';

const MenuRight = () => (
  <Space>
    <LoginModal />
    <SignupModal />
    <ShareVideoModal />
  </Space>
);

export default MenuRight;
