import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage' ;
import OtpPage from '../pages/OtpPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import AgentRegister from '../pages/AgentRegister';
import PublicRoute from './PublicRoute';

const AuthRoute : React.FC = () =>{
     return(
         <Routes>
                <Route path="/" element={ < HomePage/>} />
                <Route path="/register" element={ <RegisterPage />} />
                <Route path='/otp/:user' element={<OtpPage />} />
                <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/ResetPassword/:token' element={<ResetPasswordPage />} />
                <Route path="/agentRegister" element={<AgentRegister /> } />
        </Routes>
     )
}

export default AuthRoute;