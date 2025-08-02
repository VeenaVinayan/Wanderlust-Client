import React from 'react';
import { Route , Routes } from 'react-router-dom';
import Dashboard from '../pages/Admin/AdminDashboard';;
import Users from '../components/Admin/Users';
import Agents from '../components/Admin/Agents';
import Category from '../components/Admin/Category';
import Verification from '../components/Admin/AgentVerification';
import AgentCard  from '../components/Admin/AgentCard';
import Packages from '../components/Admin/Packages';
import PackageView from '../components/Admin/PackageView';
import Booking from '../components/Admin/BookingData';
import BookingView from '../components/Admin/BookingView';
import DashboardData from '../components/Admin/Dashboard';
import Notification from '../components/Notification/Notification';

//import AgentPackages from '../components/Admin/AgentPackages';

const AdminRoute : React.FC = () =>{
    return(
        <Routes>
             <Route path="/adminDashboard" element={< Dashboard />} >
                <Route index element={<DashboardData/>} />
                <Route path="users" element={<Users />} />
                <Route path="agentView" element={<Agents />} />
                <Route path="category" element={<Category /> } />
                <Route path="verification" element={< Verification/>}  />
                <Route path="agentCard" element={<AgentCard/>}  />
                <Route path="packages" element={<Packages />} />
                <Route path="viewPackage" element={<PackageView/>} />
                <Route path="booking" element={<Booking/>} />
                <Route path="bookingView" element={<BookingView /> } />
                <Route path="notification" element={<Notification />} />
             </Route>
        </Routes>
    )
}

export default AdminRoute;