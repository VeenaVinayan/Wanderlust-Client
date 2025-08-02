import React from 'react'
import Register from '../components/Authentication/AgentRegister';
import Header from '../components/layout/Shared/Header';

const AgentRegister: React.FC = () => {
  return (
    <div>
      <Header />   
      <Register />
    </div>
  )
}

export default AgentRegister;
