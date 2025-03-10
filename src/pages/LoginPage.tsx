import React from 'react'
import Navbar from '../components/layout/Navbar'
import Login from '../components/Authentication/Login'
import Footer from '../components/layout/Footer'

const LoginPage : React.FC = () => {
  return (
    <div>
        <Navbar />
        <Login />
        <Footer />
    </div>
  )
}

export default LoginPage
