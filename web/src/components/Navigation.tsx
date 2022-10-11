/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Home from '../navigation/Home';
import SignIn from '../navigation/SignIn';
import SignUp from '../navigation/SignUp';
import Account from '../navigation/Account';
import { getUserData } from '../store/reducers/user';
import SplashScreen from '../navigation/SplashScreen';
import ResetPassword from '../navigation/ResetPassword';
import { getAuthenticationToken } from '../store/reducers/auth';

export default () => {
  const userData = useSelector(getUserData);
  const token = useSelector(getAuthenticationToken);

  return (
    <Routes>
      {token && userData ? (
        <>
          <Route path='/home' element={<Home />} />
          <Route path='/account' element={<Account />} />
        </>
      ) : null}

      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='*' element={<SplashScreen />} />
    </Routes>
  );
};
