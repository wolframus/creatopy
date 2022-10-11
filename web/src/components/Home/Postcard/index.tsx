/* eslint-disable import/no-anonymous-default-export */
import moment from 'moment';
import React, { useMemo } from 'react';
import { Card } from 'react-bootstrap';

import './index.css';
import { TPost } from '../../../common.types';

type TProps = Pick<TPost, 'title' | 'description' | 'user' | 'createdAt'>;

export default ({ title, description, user, createdAt }: TProps) => {
  const createdAtFormat = useMemo(
    () => moment(createdAt).format('LT'),
    [createdAt]
  );

  return (
    <Card className='home-post-card-container'>
      <Card.Img variant='top' src='https://picsum.photos/900' />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className='text-muted'>
          Created at {createdAtFormat} by: {user.fullName}
        </small>
      </Card.Footer>
    </Card>
  );
};
