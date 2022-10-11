import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../navigation/Home';
import SignIn from '../navigation/SignIn';
import SignUp from '../navigation/SignUp';
import Account from '../navigation/Account';
import SplashScreen from '../navigation/SplashScreen';
import ResetPassword from '../navigation/ResetPassword';

export default () => {
  return (
    <Routes>
      <Route path='/' element={<SplashScreen />} />
      <Route path='/home' element={<Home />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/account' element={<Account />} />
      <Route path='/reset-password' element={<ResetPassword />} />
    </Routes>
  );
};
