/* eslint-disable import/no-anonymous-default-export */

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ResetPasswordActions,
  getAllowResetPassword,
  getResetPasswordStatus,
} from '../../store/reducers/resetPassword';
import './index.css';
import { TSubmitResetPasswordPayload } from '../../common.types';

export default () => {
  const defaultValues: TSubmitResetPasswordPayload = {
    code: '',
    email: '',
    password: '',
  };
  const { control, handleSubmit } = useForm({ defaultValues });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allowResetPassword = useSelector(getAllowResetPassword);
  const requestStatus = useSelector(getResetPasswordStatus);

  const onSubmit = useCallback(
    (data: typeof defaultValues) => {
      if (allowResetPassword) {
        dispatch(ResetPasswordActions.submitResetPassword(data));
      } else {
        dispatch(ResetPasswordActions.intentSubmit(data));
      }
    },
    [allowResetPassword]
  );

  console.log({ requestStatus, allowResetPassword });

  useEffect(() => {
    if (requestStatus === 'loading') return;

    if (requestStatus === 'success' && allowResetPassword) {
      navigate('/sign-in');
    }
  }, [requestStatus, allowResetPassword]);

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

        <Form.Group className='mb-3 ' controlId='formBasicCode'>
          <Form.Label>Code</Form.Label>
          <Controller
            name='code'
            control={control}
            render={({ field }) => (
              <Form.Control {...field} placeholder='Code' />
            )}
          />
        </Form.Group>

        {allowResetPassword ? (
          <Form.Group className='mb-3 ' controlId='formBasicCode'>
            <Form.Label>New Password</Form.Label>
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  placeholder='New Pasword'
                  type='password'
                />
              )}
            />
          </Form.Group>
        ) : null}

        <Button
          variant='primary'
          type='submit'
          onClick={handleSubmit(onSubmit)}>
          {allowResetPassword ? 'Reset' : 'Verify'}
        </Button>
      </Form>
    </div>
  );
};
