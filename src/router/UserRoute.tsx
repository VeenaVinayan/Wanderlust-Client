import React  from "react";
import { Route , Routes } from "react-router-dom";
import UserProfile from "../pages/User/UserProfileMain";
import HomePage from "../pages/HomePage";
import User from '../components/User/UserProfile';

const UserRoute : React.FC = () =>{

   return(
      <>
       <Routes> 
          <Route path="/" element={<HomePage/>} />
          <Route path="/userProfile" element={<UserProfile/>}>
              <Route path="user" element={<User />} />
          </Route> 
       </Routes>
      </>
   )
}
export default UserRoute;
