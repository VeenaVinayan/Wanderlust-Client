import React from 'react';
import {  Route , Routes } from 'react-router-dom';
import Dashboard from '../pages/Agent/AgentDashboard';
import Verification from '../pages/Agent/AgentVerification';
import DashboardContent from '../components/Agent/DashboardContent';
import Package from '../components/Agent/Package';
import AddPackage from '../components/Agent/AddPackage';
import EditPackage from '../components/Agent/EditPackage';
import BookingData from '../components/Agent/BookingData';
import BookingView from '../components/Agent/BookingView';
import BookingPackageData from '../components/Agent/BookingPackageData';
import AgentChat from '../components/Agent/AgentChat';
import Notification from '../components/Notification/Notification';

const AgentRoute : React.FC = () =>{
    return(
        <> 
          <Routes> 
             <Route path="/agentDashboard" element={< Dashboard/>} >
                <Route path="" element={<DashboardContent />} />
                <Route path="package" element={<Package/>}  /> 
                <Route path="addPackage" element={<AddPackage/>} />
                <Route path="editPackage" element={<EditPackage/>} />
                <Route path="bookingData" element={<BookingData />}  />
                <Route path="bookingView" element={<BookingView />} />
                <Route path="bookingPackage" element={<BookingPackageData />} />
                <Route path="chat" element={<AgentChat />} />
                <Route path="notification" element={<Notification /> } />
            </Route>
            <Route path='/agentVerification' element={<Verification/>} /> 
           
          </Routes>  
       </>
    )
}

export default AgentRoute;