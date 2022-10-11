/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

import Toast from './components/Toast'
import NavBar from './components/NavBar'
import Navigation from './components/Navigation'

export default () => {
  return <>
    <NavBar />
    <Navigation />
    <Toast />
  </>
}