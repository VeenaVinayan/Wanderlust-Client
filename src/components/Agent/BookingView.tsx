import React ,{ useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TBookingResponse } from '../../types/bookingTypes';
import { Calendar, Mail, Phone, User, CreditCard, Pen } from 'lucide-react';
import { updateBookingStatusByAgent } from '../../services/Booking/BookingService';
import { toast } from 'react-toastify';
import  useSweetAlert  from '../../hooks/CustomHooks/SweetAlert';

const BookingView : React.FC = () => {
  const [ booking, setBooking]  = useState<TBookingResponse | null>(null);
  const [ isEditing, setIsEditing] = useState<boolean>(false);
  const { showConfirm } = useSweetAlert();
  const location = useLocation();
  const data : TBookingResponse = location.state;
  console.info('Data :: in views  ',data); 

  const onChange =  (e: React.ChangeEvent<HTMLSelectElement>) =>{
    e.preventDefault();
    const { value } =e.target;
    setIsEditing(false);
    console.log("Selected Value ::", value);
    showConfirm('Change Trip Status',`Do you want to change the status to ${value}?`, async () => {
      console.log('Confirmed Status Change:', value);
        if(booking){
        const response = await updateBookingStatusByAgent(booking._id,value);
        toast.success(response.message);
        setBooking((prev) => { 
          if(!prev) return null;
          return { ...prev,tripStatus:value}
    });
   }
  });
};
   
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
      { booking.tripStatus ==='Completed' || booking.tripStatus === 'Cancelled' ? (
         <span
        className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-sm
          ${booking.tripStatus === 'Completed'
            ? 'bg-green-100 text-green-700'
            : booking.tripStatus === 'Cancelled' && 'bg-gray-200 text-red-700'}`
           }
      >
        {booking.tripStatus}
      </span>
      ):(
        <div className="w-full max-w-[180px]">
          <label htmlFor="status" className="block mb-1 text-xs font-medium text-gray-500 tracking-wide">
            Booking Status
          </label>
          { isEditing ? (
            <select
            id="status"
            name="status"
            className="block w-full px-2.5 py-1 text-xs text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm 
                      focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600 transition duration-150"
            onChange={onChange}
          >
            <option value="" disabled selected className="text-gray-400">{booking.tripStatus}</option>
            <option value="In-progress" className="font-semibold">In-Progress</option>
            <option value="Confirmed" className="font-semibold">Confirmed</option>
            <option value="Cancelled" className="font-semibold">Cancelled</option>
            <option value="Completed" className="font-semibold">Completed</option>
          </select>
            ):(
              <>
                <div className="text-xs font-semibold text-gray-600">
                  <span className='rounded-full bg-orange-100 text-lg text-gray-700 font-semibold'>{booking.tripStatus}</span>
                  <Pen size={12} className="inline-block ml-1 cursor-pointer  text-gray-500 hover:text-gray-700" onClick={() => setIsEditing(true)} />
                </div> 
              </> 
            )}
         
       </div>
    )
  }   
  </div>
  <div className="grid gap-8 sm:grid-cols-2">

  <div className="bg-white rounded-xl p-6 border shadow-sm">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">👤 Customer Details</h3>
    <div className="space-y-3 text-gray-700 text-sm">
      <p className="flex items-center gap-2">
        <User className="w-4 h-4 text-gray-500" />
        <strong className="whitespace-nowrap">Name:</strong>
        <span className="truncate">{booking.email.split('@')[0]
                                      ?.replace(/[0-9]/g, '')
                                      .replace(/^([a-zA-Z])/, (match) => match.toUpperCase()) 
                                   } 
       </span>
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
    </div>
  </div>

  <div className="bg-white rounded-xl p-6 border shadow-sm">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 Booking Details</h3>
    <div className="space-y-3 text-gray-700 text-sm">
        <p className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <strong>Booking Date:</strong>
        <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
      </p>
       <p className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <strong>Travel Date:</strong>
        <span>{new Date(booking.tripDate).toLocaleDateString()}</span>
      </p>
       <p className="flex items-center gap-2">
        <CreditCard className="w-4 h-4 text-gray-500" />
        <strong>Payment Status:</strong>
        <span className='rounded-full bg-green-200 font-medium'>{booking.paymentStatus}</span>
      </p>
      <p className="flex items-center gap-2">
        💰 <strong>Total Amount:</strong>
        <span>₹{booking.totalAmount}</span>
      </p>
      <p className="flex items-center gap-2">
        <User className="w-4 h-4 text-gray-500" />
        <strong>Total Guests:</strong>
        <span>{booking.totalGuest}</span>
      </p>
      <div className="flex items-start gap-2">
        <User className="w-4 h-4 mt-1 text-gray-500" />
        <div>
          <strong>Travellers:</strong>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
            <span><strong>Adult:</strong> {booking.travellers.adult}</span>
            <span><strong>Children:</strong> {booking.travellers.children}</span>
            <span><strong>Infant:</strong> {booking.travellers.infant}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</div>
</div>

   ) }
    </>
  )
}

export default BookingView

