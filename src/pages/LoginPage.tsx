import React from 'react'
import Header from '../components/layout/Shared/Header';
import Login from '../components/Authentication/Login'
// import Footer from '../components/layout/Footer'

const LoginPage : React.FC = () => {
  return (
    <div>
        <Header />
        <Login />
    </div>
  )
}

export default LoginPage
