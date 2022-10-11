import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  AuthActions,
  getAuthenticationRequestStatus,
} from '../../store/reducers/auth';
import './index.css';

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const requestStatus = useSelector(getAuthenticationRequestStatus);

  useEffect(() => {
    if (requestStatus === 'loading') return;

    if (requestStatus === 'success') {
      navigate('/home');
    } else {
      navigate('/sign-in');
    }
  }, [requestStatus]);

  useEffect(() => {
    console.log('Authenticating');
    dispatch(AuthActions.intentAuthenticate());
  }, []);

  return (
    <div className='splash-screen-container'>
      <Spinner animation='grow' />
    </div>
  );
};
