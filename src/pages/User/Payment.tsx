import React ,{ useEffect , useState} from 'react';
import Header from '../../components/layout/Shared/Header';
import Footer from '../../components/layout/Shared/Footer';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { stripePayment } from '../../services/User/UserServices';
import {  TBookingType, TBooking } from '../../types/bookingTypes';
import { useSelector , useDispatch} from 'react-redux';   
import { RootState } from '../../app/store';
import { setBookingData } from '../../features/authentication/BookingSlice';
import Spinner from '../../components/common/Spinner';

const STRIPE_API_KEY = import.meta.env.VITE_APP_STRIPE_API_KEY;
const stripePromise = loadStripe(STRIPE_API_KEY);

const Payment: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.userData);
  const [booking, setBooking ] = useState<TBooking>();
  const location = useLocation();
  const { packageValue, bookingData } = location.state || {};
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Details ::', packageValue, bookingData,user);
    const Booking : TBooking ={
          userId:user?.id,
          packageId: packageValue?._id,
          totalGuest: bookingData?.travellers?.adult + bookingData?.travellers?.children ,
          travellers: bookingData?.travellers,
          totalAmount: bookingData?.totalAmount,
          tripDate: bookingData?.tripDate,
          email: bookingData?.email,
          phone: bookingData?.phone,
    }
    console.log('Booking Data :: in Payment ::', Booking);
    setBooking(Booking);
  },[packageValue, bookingData, user]);
  
  const handleStripCheckout = async (price: number, packageName: string) => {
    try {
       const BookingData : TBookingType  = {
          price,
          packageName
         }
       if(booking){
         dispatch(setBookingData(booking));
       }  
       const url = await stripePayment(BookingData);
       const stripe = await stripePromise;
       if (stripe) {
        window.location.href = url;
       }
    }catch(error) {
      console.error('Stripe checkout error:', error);
    }
  };
  return (
    <>
      <Header />
      <div className="min-h-screen mt-16 bg-gray-100 px-6 lg:px-20 flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {/* Booking Summary */}
          <div className="bg-white rounded-3xl shadow-lg p-8 w-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Booking Summary</h2>
            <div className="space-y-4">
              {packageValue?.images?.[2] && (
                <img
                  src={packageValue.images[2]}
                  alt={packageValue.name}
                  className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-md"
                />
              )}
              <div className="flex justify-between text-gray-600">
                <span className="font-extralight">Package Name:</span>
                <span className="font-bold text-gray-600">{packageValue?.name}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-extralight">Trip Date:</span>
                <span className="font-bold text-gray-600">
                  {bookingData?.tripDate
                    ? new Date(bookingData.tripDate).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-extralight">Duration:</span>
                <span className="font-bold text-gray-600">{packageValue?.day} Day / {packageValue.night} Nights</span>
              </div>
              <hr className='bg-gray-300'/>
              <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-extralight">Name:</span>
                    <span className="font-bold text-gray-600">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-extralight">Email:</span>
                    <span className="font-bold text-gray-600">{bookingData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-extralight">Phone:</span>
                    <span className="font-bold text-gray-600">{bookingData.phone}</span>
                  </div>
                </div>
             <hr className='bg-gray-3000' />  
             <div className="flex justify-between text-gray-600">
                <span className="font-extralight">Travellers:</span>
                <span className="font-bold text-gray-600">
                  {bookingData?.travellers?.adult ?? 0} Adults,
                  {' '}
                  {bookingData?.travellers?.children ?? 0} Children,
                  {' '}
                  {bookingData?.travellers?.infant ?? 0} Infants
                </span>
              </div>
          </div>
         </div>     
       <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6 space-y-4 border">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Payment Description</h2>
        <hr className='bg-gray-300' />
          <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Adult:</span>
                <span>
                  {bookingData.travellers.adult} × {packageValue.price} = 
                  {bookingData.travellers.adult * packageValue.price}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Children:</span>
                <span>
                  {booking?.travellers.children || 0} × {Math.ceil(packageValue.price / 2)} = 
                  {booking?.travellers?.children || 0 * Math.ceil(packageValue.price / 2)}
                </span>
              </div>

                <div className="flex justify-between">
                  <span>Infant:</span>
                  <span>{booking?.travellers.infant || 0} × 0 = 0</span>
                </div>

             <hr className="my-3 border-gray-300" />

            <div className="flex justify-between font-semibold text-gray-700 text-base">
              <span>Total Amount:</span>
              <span>₹ {bookingData?.totalAmount ?? 0}</span>
            </div>
            <div>   
               <p className="text-xs text-gray-400 mt-2 text-center">
                Including GST.
               </p>
            </div>
          </div>
          <div className='bg-slate-100'>
           
          {!isLoading ? (
            <button
              onClick={() => {
                setIsLoading(true);
                handleStripCheckout(bookingData?.totalAmount ?? 0, packageValue?.name ?? '');
              }}
              className="w-full bg-teal-600 text-white py-3 rounded-md font-semibold hover:bg-teal-700 transition"
            >
              Pay With Stripe
            </button>
          ) : (
            <Spinner />
          )}
          <p className="text-xs text-gray-400 mt-2 text-center">
            Your payment is secure and encrypted via Stripe.
          </p>
        </div>   
       </div>
      </div>
      </div>
    <Footer />
   </> 
  );
};

export default Payment;
