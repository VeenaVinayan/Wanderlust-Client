import { Navigate, Outlet } from "react-router-dom";
import React from 'react';

const PrivateRoute : React.FC = () =>{
     const token = localStorage.getItem(`accessToken`);
     return token ? <Outlet /> :  <Navigate to="/login" />
}

export default PrivateRoute;