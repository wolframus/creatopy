/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  UserActions,
  getUserData,
  getUserRequestStatus,
} from '../../store/reducers/user';
import './index.css';
import UserProfile from './UserProfile';

export default () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const requestStatus = useSelector(getUserRequestStatus);
  const userData = useSelector(getUserData);

  useEffect(() => {
    if (!userData?.email && requestStatus === 'success') {
      navigator('/sign-in');
    }
  }, [requestStatus, userData?.email]);

  useEffect(() => {
    dispatch(UserActions.intentFetchUserData());
  }, []);

  return (
    <div className='account-page-container'>
      {requestStatus === 'loading' ? (
        <Spinner animation='grow' />
      ) : userData ? (
        <UserProfile />
      ) : null}
    </div>
  );
};
