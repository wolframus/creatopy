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
      <div className='account-page-inner-container'>
        <p className='account-page-info-item'>
          <p className='fs-5 text-bold account-page-info-item-margin-right'>
            Email:
          </p>
          <p>{userData.email}</p>
        </p>

        <p className='account-page-info-item'>
          <p className='fs-5 text-bold account-page-info-item-margin-right'>
            Full Name:
          </p>
          <p>{userData.fullName}</p>
        </p>
        <Button onClick={handleLogOut}>Log Out</Button>
      </div>
    </div>
  );
};
