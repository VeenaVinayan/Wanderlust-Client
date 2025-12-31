import React  from "react";
import { Route , Routes } from "react-router-dom";
import UserProfile from "../pages/User/UserProfileMain";
import HomePage from "../pages/HomePage";
import User from '../components/User/UserProfile';
import Booking from '../pages/User/Booking';
import Payment from '../pages/User/Payment'
import Success from '../pages/User/PaymentSuccess';
import Cancel from '../pages/User/PaymentFailure';
import BookingData from '../components/User/BookingData';
import BookingDetails from '../components/User/BookingDetails';
import Wishlist from '../components/User/Wishlist';
import Wallet from '../components/User/Wallet';
import Notification from '../components/Notification/Notification'
import UserChat from '../components/User/UserChat';

const UserRoute : React.FC = () =>{
   return(
      <>
       <Routes> 
          <Route path="/" element={<HomePage/>} />
           <Route path="/userProfile" element={<UserProfile/>}>
              <Route path="profile" element={<User />} />
              <Route path="booking" element={<BookingData/>} />
              <Route path="bookingDetails" element={<BookingDetails/>} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="Wallet" element={<Wallet/>} />
              <Route path="notification" element={<Notification/>} />
              <Route path="chat" element={<UserChat/>} />
          </Route> 
          <Route path="/booking" element={<Booking/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/success" element={<Success/>} />
          <Route path="/cancel" element={<Cancel />} />
       </Routes>
      </>
   )
}
export default UserRoute;
