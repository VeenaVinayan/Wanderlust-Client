import React from 'react'
import Navbar from '../components/layout/Navbar';
import Register from '../components/Authentication/Register';

const registerPage : React.FC= () => {
  return (
    <div>
      <Navbar />
      <Register />
    </div>
  )
}

export default registerPage;


