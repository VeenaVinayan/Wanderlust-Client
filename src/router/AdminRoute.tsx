import React from 'react';
import {  Routes , Route } from 'react-router-dom';
import Dashboard from '../pages/Admin/AdminDashboard';;
import Users from '../components/Admin/Users';
import Agents from '../components/Admin/Agents';
import Category from '../components/Admin/Category';
import Verification from '../components/Admin/AgentVerification';
import AgentCard from '../components/Admin/AgentCard';

const AdminRoute : React.FC = () =>{
    return(
        <Routes>
             <Route path="/adminDashboard" element={< Dashboard />} >
                <Route path="users" element={<Users />} />
                <Route path="agentView" element={<Agents />} />
                <Route path="category" element={<Category /> } />
                <Route path="verification" element={< Verification/>}  />
                <Route path="agentCard" element={<AgentCard/>}  />
            </Route>
        </Routes>
    )
}

export default AdminRoute;