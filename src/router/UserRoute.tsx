import React  from "react";
import { Routes, Route } from "react-router-dom";
import UserProfile from "../pages/User/UserProfile";

const UserRoute : React.FC = () =>{
   return(
      <>
        <Routes>
             <Route path="/userProfile" element={<UserProfile/>} />
          </Routes>
      </>
   )
}

export default UserRoute;
