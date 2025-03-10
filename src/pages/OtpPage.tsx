import React from 'react'
import Otp from '../components/Authentication/Otp';
import Header from '../components/layout/authHeader';
const OtpPage: React.FC = () => {
  return (
    <div>
       <Header /> 
       <Otp />
    </div>
  )
}

export default OtpPage
