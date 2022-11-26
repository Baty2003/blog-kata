import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;
const Loader = () => {
  return (
    <>
      <Spin indicator={antIcon} style={{ display: 'flex', justifyContent: 'center' }} />;
    </>
  );
};
export default Loader;
