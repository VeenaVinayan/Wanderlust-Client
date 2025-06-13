
import { Navigate, Outlet } from "react-router-dom";
import React from 'react';

const PrivateRoute : React.FC = () =>{
     const role  = activeRole();
     const token = localStorage.getItem(`${role}_accessToken`);
     console.log('In private Route ::', token);
     return token ? <Outlet /> :  <Navigate to="/login" />
}

const activeRole = ()  =>{
     if(localStorage.getItem('Admin_accessToken')) return "Admin"
     if(localStorage.getItem('User_accessToken')) return "User"
     if(localStorage.getItem('Agent_accessToken')) return "Agent"
}

export default PrivateRoute;