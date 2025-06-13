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

const STRIPE_API_KEY = import.meta.env.VITE_APP_STRIPE_API_KEY;
const stripePromise = loadStripe(STRIPE_API_KEY);

const Payment: React.FC = () => {

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
      <div className="min-h-screen mt-16 bg-gray-100 px-6 lg:px-20 flex justify-center items-center">
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
                <span className="font-extralight">Travellers:</span>
                <span className="font-bold text-gray-600">
                  {bookingData?.travellers?.adult ?? 0} Adults,
                  {' '}
                  {bookingData?.travellers?.children ?? 0} Children,
                  {' '}
                  {bookingData?.travellers?.infant ?? 0} Infants
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-extralight">Total Amount:</span>
                <span className="text-lg font-bold text-indigo-600">
                  ₹ {bookingData?.totalAmount ?? 0}
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                handleStripCheckout(bookingData?.totalAmount ?? 0, packageValue?.name ?? '')
              }
              className="w-64 bg-gray-600 text-white py-3 mt-6 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Pay With Stripe
            </button>

            <p className="text-gray-400 font-thin text-sm mt-2">
                Your payment is secure and encrypted via Stripe.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
