/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Button } from 'react-bootstrap';

import './index.css';

type TProps = {
  userName: string;
  onCreatePress: () => void;
};

export default ({ userName, onCreatePress }: TProps) => {
  return (
    <div className='create-post-preview-container'>
      <div className='create-post-preview-left'>
        <span className='fs-4 text-bold'>{userName}</span> <br />
        Take advance and publish your thoughts on our platform
      </div>

      <div className='create-post-preview-right'>
        <Button onClick={onCreatePress}>Create!</Button>
      </div>
    </div>
  );
};
