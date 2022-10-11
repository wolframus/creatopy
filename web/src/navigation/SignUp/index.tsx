/* eslint-disable import/no-anonymous-default-export */
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { useForm, Controller } from 'react-hook-form';

import { TSignUpRequestPayload } from '../../common.types';
import { SignUpActions } from '../../store/reducers/signUp';

import './index.css';

export default () => {
  const defaultValues: TSignUpRequestPayload & { repeatPassword: string } = {
    email: '',
    fullName: '',
    password: '',
    repeatPassword: '',
  };
  const { control, handleSubmit } = useForm({ defaultValues });

  const dispatch = useDispatch();

  const onSubmit = useCallback((data: typeof defaultValues) => {
    dispatch(SignUpActions.intentSubmit(data));
  }, []);

  return (
    <div className='sign-up-container'>
      <Form className='form-container'>
        <Form.Group className='mb-3 ' controlId='formBasicFullName'>
          <Form.Label>Full Name</Form.Label>
          <Controller
            name='fullName'
            control={control}
            render={({ field }) => (
              <Form.Control
                {...field}
                type='email'
                placeholder='Enter full name'
              />
            )}
          />
        </Form.Group>

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

        <Form.Group className='mb-3 ' controlId='formBasicRepeatPassword'>
          <Form.Label>Repeat Password</Form.Label>
          <Controller
            name='repeatPassword'
            control={control}
            render={({ field }) => (
              <Form.Control
                {...field}
                type='password'
                placeholder='Repeat Password'
              />
            )}
          />
        </Form.Group>

        <Button
          variant='primary'
          type='submit'
          onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
