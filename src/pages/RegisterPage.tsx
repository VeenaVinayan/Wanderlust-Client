import React from 'react'
import Register from '../components/Authentication/Register';
import Header from '../components/layout/Shared/Header';
const registerPage : React.FC= () => {
  return (
    <div>
      <Header />
      <Register />
    </div>
  )
}

export default registerPage;


