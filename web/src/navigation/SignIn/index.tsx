/* eslint-disable import/no-anonymous-default-export */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';
import { TSignInRequestPayload } from '../../common.types';
import { SignInActions } from '../../store/reducers/signIn';
import { getAuthenticationRequestStatus } from '../../store/reducers/auth';

export default () => {
  const defaultValues: TSignInRequestPayload = {
    email: '',
    password: '',
  };
  const { control, handleSubmit } = useForm({ defaultValues });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = useCallback((data: typeof defaultValues) => {
    dispatch(SignInActions.intentSubmit(data));
  }, []);

  const requestStatus = useSelector(getAuthenticationRequestStatus);

  useEffect(() => {
    if (requestStatus === 'loading') return;

    if (requestStatus === 'success') {
      navigate('/home');
    }
  }, [requestStatus]);

  return (
    <div className='sign-up-container'>
      <Form className='form-container'>
        <Form.Group className='mb-3 ' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Form.Control {...field} type='email' placeholder='Enter email' />
            )}
          />
        </Form.Group>

        <Form.Group className='mb-3 ' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Form.Control {...field} type='password' placeholder='Password' />
            )}
          />
        </Form.Group>

        <div className='sign-in-bottom-buttons'>
          <Link to='/reset-password'>Forgot password</Link>

          <Button
            variant='primary'
            type='submit'
            onClick={handleSubmit(onSubmit)}>
            Log In
          </Button>
        </div>
      </Form>
    </div>
  );
};
