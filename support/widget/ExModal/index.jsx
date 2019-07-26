import React from 'react';
import { Modal } from 'antd';

export default function ExModal(props) {
  return (
    <Modal {...props} maskClosable={false} okButtonProps={{ loading: props.loading }}>
      {props.children}
    </Modal>
  );
}
