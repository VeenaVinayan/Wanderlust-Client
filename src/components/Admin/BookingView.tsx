import React ,{ useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TBookingResponse } from '../../types/bookingTypes';
import { CheckCircle, Calendar, Mail, Phone, User } from 'lucide-react';
import { toast } from 'react-toastify';

const BookingView : React.FC = () => {
  const [ booking, setBooking] = useState<TBookingResponse>();  
  const location = useLocation();
  const data = location.state;
  console.info('Data :: ',data); 

  useEffect(() => {
      setBooking(data);
  },[data]);
  return (
  <>
  { !booking ?( <p>No Booking data Avilable !!</p> ) : (
   <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 mb-6 border shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">{booking?.packageId.name}</h2>
      <span
          className={`text-sm font-medium px-3 py-1 rounded-full 
          ${booking.tripStatus === 'Completed' ? 'bg-green-100 text-green-700' : 
         booking.tripStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
           'bg-gray-100 text-gray-700'} 
           shadow-sm`}
         >
  {booking.tripStatus}
 </span>
    </div>
     <div className="space-y-3 text-gray-700 text-sm">
      <p className="flex items-center gap-2">
        <User className="w-4 h-4 text-gray-500" />
        <strong>Customer:</strong> <span className="ml-1">{booking.userId}</span>
      </p>
      <p className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-gray-500" />
        <strong>Email:</strong> <span className="ml-1">{booking.email}</span>
      </p>
      <p className="flex items-center gap-2">
        <Phone className="w-4 h-4 text-gray-500" />
        <strong>Phone:</strong> <span className="ml-1">{booking.phone}</span>
      </p>
      <p className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <strong>Travel Date:</strong> <span className="ml-1">{new Date(booking.tripDate).toLocaleDateString()}</span>
      </p>
      <p className="flex items-center gap-2">
        💰 <strong>Total Amount:</strong> <span className="ml-1">₹{booking.totalAmount}</span>
      </p>
    </div>
   
   </div>
   ) }
    </>
  )
}

export default BookingView

