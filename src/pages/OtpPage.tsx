import React from 'react'
import Otp from '../components/Authentication/Otp';
import Header from '../components/layout/Shared/Header';

const OtpPage : React.FC= () => {
  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <Header />

      <main className="pt-16 h-[calc(100vh-64px)] flex items-center justify-center px-4">
        <Otp />
      </main>
    </div>
  );
};


export default OtpPage
