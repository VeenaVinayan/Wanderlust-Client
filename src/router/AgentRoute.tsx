import React from 'react';
import {  Route ,Routes } from 'react-router-dom';
import Dashboard from '../pages/Agent/AgentDashboard';
import Verification from '../pages/Agent/AgentVerification';
import DashboardContent from '../components/Agent/DashboardContent';
import Package from '../components/Agent/Package';
import AddPackage from '../components/Agent/AddPackage';

const AgentRoute : React.FC = () =>{
    return(
        <> 
          <Routes>
            <Route path="/agentDashboard" element={< Dashboard/>} >
                <Route path="" element={<DashboardContent />} />
                <Route path="package" element={<Package/>}  /> 
                <Route path="addPackage" element={<AddPackage/>} />
            </Route>
            <Route path='/agentVerification' element={<Verification/>} /> 
          </Routes>
        </>
    )
}

export default AgentRoute;