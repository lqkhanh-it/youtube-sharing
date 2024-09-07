import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import SignUp from '../../Signup';

const SignupModal: React.FC = () => {
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
        Sign Up
      </Button>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <SignUp callback={handleOk} />
      </Modal>
    </>
  );
};

export default SignupModal;
