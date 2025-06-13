import React ,{ useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TBookingResponse } from '../../types/bookingTypes';
import { CheckCircle, Calendar, Mail, Phone, User } from 'lucide-react';
import { updateBookingStatusByAgent } from '../../services/Booking/BookingService';
import { toast } from 'react-toastify';

const BookingView : React.FC = () => {
  const [ booking, setBooking] = useState<TBookingResponse | null>(null); 
  const location = useLocation();
  const data : TBookingResponse = location.state;
  console.info('Data :: in views  ',data); 

  const handleStatusUpdate = async () =>{
    if(booking){
        const response = await updateBookingStatusByAgent(booking._id);
        toast.success(response.message);
        setBooking((prev) => { 
          if(!prev) return null;
          return { ...prev,tripStatus:'Completed'}
    });
   }
  }
 useEffect(() => {
      setBooking(data);
  },[data,booking]);
  return (
  <>
  { !booking ?( <p>No Booking data Avilable !!</p> ) : (
   <div className="mx-auto max-w-full sm:max-w-2xl lg:max-w-4xl bg-white border shadow-lg rounded-2xl overflow-hidden">
    <div className="w-full h-48 sm:h-56 lg:h-72 overflow-hidden">
     <img
      src={booking.packageId.images[0]}
      alt={booking.packageId.name}
      className="w-full h-full object-cover m-2 transition-transform duration-300 hover:scale-105"
     />
  </div>

  <div className="p-5 sm:p-6 lg:p-8 space-y-6">
   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        {booking.packageId.name}
      </h2>
      <span
        className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-sm
          ${booking.tripStatus === 'Completed'
            ? 'bg-green-100 text-green-700'
            : booking.tripStatus === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-200 text-red-700'}`}
      >
        {booking.tripStatus}
      </span>
    </div>

    {/* Metadata */}
    <div className="grid gap-4 text-gray-700 text-sm sm:grid-cols-2 lg:grid-cols-3">
      <p className="flex items-center gap-2">
        <User className="w-4 h-4 text-gray-500" />
        <strong className="whitespace-nowrap">Customer:</strong>
        <span className="truncate">{booking.userId?.name}</span>
      </p>

      <p className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-gray-500" />
        <strong>Email:</strong>
        <span className="truncate">{booking.email}</span>
      </p>

      <p className="flex items-center gap-2">
        <Phone className="w-4 h-4 text-gray-500" />
        <strong>Phone:</strong>
        <span className="truncate">{booking.phone}</span>
      </p>

      <p className="flex items-center gap-2">
        <User className="w-4 h-4 text-gray-500" />
        <strong>Total&nbsp;Guests:</strong>
        <span>{booking.totalGuest}</span>
      </p>

     <p className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <strong>Travel&nbsp;Date:</strong>
        <span>{new Date(booking.tripDate).toLocaleDateString()}</span>
      </p>

      <p className="flex items-center gap-2">
        💰 <strong>Total&nbsp;Amount:</strong>
        <span>₹{booking.totalAmount}</span>
      </p>

       <p className="flex items-center gap-2">
        <User className="w-4 h-4 text-gray-500" />
        <strong>Travellers:</strong>
       <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-700">
          <span>
            <strong>Adult:</strong> {booking.travellers.adult}
          </span>
          <span>
            <strong>Children:</strong> {booking.travellers.children}
          </span>
          <span>
            <strong>Infant:</strong> {booking.travellers.infant}
          </span>
       </div>
      </p>
    </div>

    {/* Action */}
    {(booking.tripStatus !== 'Completed' && booking.tripStatus !== 'Cancelled') && (
      <button
        onClick={handleStatusUpdate}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
      >
        <CheckCircle className="w-4 h-4" />
        Mark as Completed
      </button>
    )}
  </div>
</div>

   ) }
    </>
  )
}

export default BookingView

