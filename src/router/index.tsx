import React from "react";
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import AuthRoute from'./AuthRoute' ;
import AdminRoute from './AdminRoute'
import UserRoute from './UserRoute';
import AgentRoute from './AgentRoute';
import PrivateRoute from './PrivateRoute';

const AppRouter : React.FC = () =>{
   return(
    <>
    <Router>
        <Routes>
         <Route path="/*" element={<AuthRoute />} />
         <Route element={<PrivateRoute />}>
            <Route path="/admin/*" element={<AdminRoute />} />
            <Route path="/user/*"  element={<UserRoute />} />
            <Route path="/agent/*" element={<AgentRoute />} />
          </Route>
        </Routes>
      </Router>
    </>
   )
}

export default AppRouter;