import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ShareVideo from '../../ShareVideo';

const ShareVideoModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Share Video
      </Button>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <ShareVideo />
      </Modal>
    </>
  );
};

export default ShareVideoModal;
