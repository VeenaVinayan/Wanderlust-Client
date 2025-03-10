import React from 'react'
import Register from '../components/Authentication/AgentRegister';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AgentRegister: React.FC = () => {
  return (
    <div>
      <Navbar />   
      <Register />
      <Footer />
    </div>
  )
}

export default AgentRegister;
