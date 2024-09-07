import { Button, Space, Typography } from 'antd';
import React, { useEffect } from 'react';
import LoginModal from '../../modal/LoginModal';
import SignupModal from '../../modal/SignupModal';
import ShareVideoModal from '../../modal/ShareVideoModal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchUser, logoutUser, selectUser } from '../../../store/slices/user.slice';

const { Text } = Typography;
const MenuRight = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <Space>
      {user ? (
        <Space>
          <Button type="link" onClick={() => dispatch(logoutUser())}>
            Logout
          </Button>
          <Text>Hello, {user?.name}</Text>
          <ShareVideoModal />
        </Space>
      ) : (
        <Space>
          <LoginModal />
          <SignupModal />
        </Space>
      )}
    </Space>
  );
};

export default MenuRight;
