import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Nav className='justify-content-end'>
      <Nav.Item>
        <Nav.Link>
          <Link to='/home'>Home</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Link to='/account'>Account</Link>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
