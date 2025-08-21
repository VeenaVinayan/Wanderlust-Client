import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import AgentRoute from "./AgentRoute";
import PrivateRoute from "./PrivateRoute"; 
import MainSearch from '../pages/User/MainSearch';
import PackageDetails from '../pages/User/packageDetails';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={<AuthRoute />} />
        <Route path="/user/search" element={<MainSearch />} /> 
        <Route path="/user/packageDetails" element={< PackageDetails />} />
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin/*" element={<AdminRoute />} />
          <Route path="/agent/*" element={<AgentRoute />} />
          <Route path="/user/*" element={<UserRoute/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
