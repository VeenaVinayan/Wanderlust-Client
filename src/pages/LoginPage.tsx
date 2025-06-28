import React from 'react'
import Navbar from '../components/layout/Navbar'
import Header from '../components/layout/Shared/Header';
import Login from '../components/Authentication/Login'
import Footer from '../components/layout/Footer'

const LoginPage : React.FC = () => {
  return (
    <div>
        <Header />
        <Login />
        <Footer />
    </div>
  )
}

export default LoginPage
