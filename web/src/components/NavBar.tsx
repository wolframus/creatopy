import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Nav className='bg-light justify-content-end' style={{ width: '80vw' }}>
        <Nav.Item>
          <Nav.Link>
            <Link
              style={{ textDecoration: 'none' }}
              className='text-black'
              to='/home'>
              Home
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link
              style={{ textDecoration: 'none' }}
              className='text-black'
              to='/account'>
              Account
            </Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};
