/* eslint-disable import/no-anonymous-default-export */
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast, ToastContainer } from 'react-bootstrap';

import { TToastTypes } from '../../common.types';
import { getToastData, ToastActions } from '../../store/reducers/toast';

const toastTypes: { [key in TToastTypes]: string } = {
  error: 'danger',
  success: 'success',
};

export default () => {
  const dispatch = useDispatch();

  const { description, show, title, type } = useSelector(getToastData);

  const toastType = useMemo(() => toastTypes[type] || 'light', [type]);

  const handleClose = () => dispatch(ToastActions.hideToast());

  return (
    <ToastContainer position='top-end'>
      <Toast show={show} bg={toastType} autohide onClose={handleClose}>
        <Toast.Header>
          <strong className='me-auto'>{title}</strong>
        </Toast.Header>
        <Toast.Body className='text-white'>{description}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
