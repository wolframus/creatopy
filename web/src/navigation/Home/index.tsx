/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import {
  HomeActions,
  getHomePosts,
  getHomeCreateRequestStatus,
} from '../../store/reducers/home';
import './index.css';
import { TSubmitFeedPost } from '../../common.types';
import PostCard from '../../components/Home/Postcard';
import { getUserData } from '../../store/reducers/user';
import CreatePostPreview from '../../components/Home/CreatePostPreview';

export default () => {
  const defaultValues: TSubmitFeedPost = {
    title: '',
    description: '',
  };
  const { control, handleSubmit, reset } = useForm({ defaultValues });

  const dispatch = useDispatch();

  const userData = useSelector(getUserData);
  const homePosts = useSelector(getHomePosts);
  const createPostStatus = useSelector(getHomeCreateRequestStatus);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  const onSubmit = (data: typeof defaultValues) =>
    dispatch(HomeActions.intentCreatePost(data));

  useEffect(() => {
    if (createPostStatus === 'success') {
      handleCloseModal();
      dispatch(HomeActions.setCreatePostRequestStatus('sleep'));
    }
  }, [createPostStatus]);

  useEffect(() => {
    dispatch(HomeActions.intentFetchPosts());
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <>
      <div className='home-page-container'>
        {homePosts.length ? (
          <CreatePostPreview
            onCreatePress={() => setShowModal(true)}
            userName={userData.fullName}
          />
        ) : (
          <div className='home-page-no-data-container'>
            <span className='fs-4 mb-2'>No posts published yet!</span>
            <span className='fs-5 mb-2'>
              Be the first to share your thougts!
            </span>
            <Button onClick={() => setShowModal(true)}>Create Post!</Button>
          </div>
        )}

        <div className='home-page-posts-body'>
          {homePosts.map((item) => (
            <PostCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <Modal centered show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tell us something!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className='mb-3 ' controlId='formBasicTitle'>
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type='email'
                    placeholder='Forecast for today...'
                  />
                )}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    as='textarea'
                    className='custom-textarea'
                    placeholder='The weather is still rainy. Pressure of the atmosphere makes me crazy'
                  />
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant='success' onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
