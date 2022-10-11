/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';
import { AuthActions } from '../../store/reducers/auth';
import { getUserData } from '../../store/reducers/user';

export default () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const userData = useSelector(getUserData);

  const handleLogOut = () => {
    dispatch(AuthActions.intentLogOut());
    navigator('/sign-in');
  };

  return (
    <div className='account-page-container'>
      <p>{userData.email}</p>
      <p>{userData.fullName}</p>
      <Button onClick={handleLogOut}>Log Out</Button>
    </div>
  );
};
