import React , { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import Header from '../../components/layout/Shared/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { bookPackage } from '../../services/Booking/BookingService'
import { useDispatch } from 'react-redux';
import { resetBookingData } from '../../features/authentication/BookingSlice'; 
import { TBooking } from '../../types/bookingTypes';

const Success: React.FC = () => {
  const { width, height } = useWindowSize();
  const checkBooking = useRef(false);
  const booking : TBooking = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch();
  
  useEffect(() => {
   const packageBooking = async () => {
     if(booking) {
      if(checkBooking.current) return;
      checkBooking.current = true;
      const response = await bookPackage(booking);
      if(response) {
        dispatch(resetBookingData());
      }
     }
   } 
   packageBooking();
  },[]);
 return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-4 relative overflow-hidden">
       <Header />
       <div className='flex flex-col justify-center items-center bg-white rounded-3xl shadow-lg p-8 w-full max-w-md'>
       <Confetti 
                width={width ?? 300} 
                height={height ?? 300} 
        />
      <CheckCircle className="text-green-500 w-16 h-16 mb-4 z-10" />
      <h1 className="text-2xl font-bold text-green-700 mb-2 z-10">Payment Successful!</h1>
      <p className="text-green-600 mb-6 z-10">Thank you for your purchase. Your booking is confirmed.</p>
      <Link
        to="/user/userProfile"
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 z-10"
      >
        Back to Home
      </Link>
      </div>
     </div>
  );
};

export default Success;
