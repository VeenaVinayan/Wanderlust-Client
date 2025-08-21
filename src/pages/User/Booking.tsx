import React , { useState , useEffect} from 'react';
import Header from '../../components/layout/Shared/Header'
import Footer from '../../components/layout/Shared/Footer';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TBookingData, TBookingValidationData } from '../../types/bookingTypes';
import schema from '../../Validations/Booking'
import { useNavigate } from 'react-router-dom';
import { policy } from '../../Constants/Packages';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ValidationError } from 'yup';
import { getPackageBookingDataValue } from '../../services/Booking/BookingService';
import {  TPackageDataValue } from '../../types/packageTypes';
import CancellationPolicy from '../../components/User/CancellationPolicy';

const Booking : React.FC = ()  => {
  const [packageValue, setPackageValue ] = useState<TPackageDataValue>();
  const [totalCapcity, setTotalCapacity ] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();
  const packageData : TPackageDataValue = location.state;
  const {email ,phone} = useSelector((state: RootState) => state.userData);
  let availabilityMap : Record<string,number> ;
  const [ errors, setErrors ] = useState<Record<string, string>>({
    tripDate: '',
     'travellers.adult': '',
     'travellers.children': '',
     'travellers.infant': '',
    email: '',
    phone: '',
    totalAmount: '',
  });
  
  const [ bookingData, setBookingData ] = useState<TBookingData>({
    tripDate: new Date(),
    travellers: {
      adult: 1,
      children: 0,
      infant: 0,
    },
    email: email,
    phone: phone,
    totalAmount: packageValue?.price || 0,
  });
  useEffect(() =>{
     setPackageValue(packageData);
     setBookingData(prev =>({
       ...prev, totalAmount: packageData.price || 0,
   }));
      (async () => {
          const today = new Date();
          if (packageData && packageData.id) {
            const data : TBookingValidationData= await getPackageBookingDataValue(packageData.id, today);
            console.log(data);
            if(!data?.tripDate){
                setTotalCapacity(data.totalCapacity);
                setCalenderValue(data);
            }
          } else {
            console.warn('Package ID is undefined');
          }
      })();
  },[packageData]);
  
  const setCalenderValue = (data: TBookingValidationData)=>{
        availabilityMap = data?.tripDate.reduce((map, item) => {
                map[new Date(item.date).toDateString()] = item.bookingCount;
                return map;
              }, {} as Record<string, number>);
            }
         const getStatus = (date: Date) => {
              const dateKey = date.toDateString(); 
              const today = new Date();
              const count = availabilityMap?.[dateKey];  
              if (count >= totalCapcity) return { color: "red" };
              if (count >= totalCapcity * 0.7) return {  color: "orange" };
              if(today> date) return { color:'gray'}
              return {  color: "green" };
          }
       
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Number(value);
  
    if (['adult', 'children', 'infant'].includes(name)) {
      const updatedTravellers = {
        ...bookingData?.travellers,
        [name]: numValue,
      };
      const price = packageValue?.price || 0;
      const { adult = 0, children = 0 } = updatedTravellers;
  
      const totalAmount  = Number(adult) * price + children * (price * 0.5);
      setBookingData((prev) => ({
        ...prev,
        travellers: updatedTravellers,
        totalAmount,
      }));
    } else {
      setBookingData((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };
  const handleDateChange = (date: Date | null) => {
     if (date) {
       setBookingData((prev) => ({ ...prev, tripDate: date }));
     }
  };
  const handleSubmit= async (e: React.FormEvent) =>{
     e.preventDefault();
 try{
     await schema.validate(bookingData, { abortEarly: false })
     console.log('Booking Data : ', bookingData);
     navigate('/user/payment', { state: { bookingData, packageValue } });
  }catch (err: unknown) {
  if (err instanceof ValidationError) {
    const newErrors: Record<string, string> = {};
    err.inner.forEach((e) => {
      if (e.path) {
        newErrors[e.path] = e.message;
      }
    });
    setErrors(newErrors);
  } else {
    console.error("Unexpected error during validation:", err);
  }
}
}
return (
  <>
    <div className="flex min-h-screen bg-gray-100 mt-12 flex-col">
      <Header />
      <div className="flex flex-col lg:flex-row gap-10 px-6 lg:px-20 py-10 w-full justify-center items-start">
        <div className="bg-white rounded-3xl shadow-lg p-6 max-w-xl w-full hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
            {packageValue?.name}
          </h2>
          <img
            src={packageValue?.images[2]}
            alt={packageValue?.name}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-md"
          />
         <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">
              {packageValue?.day} Days / {packageValue?.night} Nights
            </span>
            <span className="text-xl font-semibold text-indigo-600">
              ₹ {packageValue?.price.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-lg max-w-xl w-full p-8 hover:shadow-xl transition">
          <h6 className="text-3xl font-bold text-gray-700 mb-6">Booking Details</h6>
          <form onSubmit={handleSubmit}>
          <div className="mb-5">
          
            <label className="text-gray-600 block mb-2 text-sm">Trip Date</label>
            <DatePicker
                selected={bookingData?.tripDate}
                onChange={handleDateChange}
                dateFormat="dd-MM-yyyy"
                minDate={new Date()}
                placeholderText="Choose a date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                renderDayContents={(day, date) => {
                  const { color } = getStatus(date);
                  return (
                    <div
                      className={`w-10 h-10 flex flex-col items-center justify-center rounded-md text-xs font-medium transition-all duration-200`}
                      style={{
                        backgroundColor: color,
                        color: color === '#ffffff' ? '#000000' : '#1f2937'
                      }}
                    >
                      <span className="text-base">{day}</span>
                  </div>
                  );
                }}
              />
         {errors.tripDate && <p className="text-red-500">{errors.tripDate}</p>}
          </div>
          <div className="mb-5">
            <label className="text-gray-600 block mb-2 text-sm">Travellers</label>
            <div className="flex gap-4 flex-wrap">
              {[
                { name: 'adult', label: 'Adult' },
                { name: 'children', label: '5 to 12 yrs' },
                { name: 'infant', label: 'Below 5 yrs' }
              ].map(({ name, label }) => (
                <div key={name} className="flex flex-col gap-1">
                  <input
                    type="number"
                    name={name}
                    value={bookingData?.travellers[name as keyof typeof bookingData.travellers]}
                    onChange={handleChange}
                     min="0"
                     className="w-28 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <label className="text-gray-600 text-sm text-center">{label}</label>
                </div>
            ))}
            </div>
            {errors['travellers.adult'] && <p className='text-red-700'>{errors['travellers.adult']}</p>}
            {errors['travellers.children'] && <p className='text-red-700'>{errors['travellers.children']}</p>}
            {errors['travellers.infant'] && <p className='text-red-700'>{errors['travellers.infant']}</p>}
          </div>
          <div className="mb-5">
            <label className="text-gray-600 block mb-2 text-sm">Total Amount</label>
            <input
              type="text"
              name="price"
              value={bookingData?.totalAmount}
              onChange={handleChange}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
              {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>

         <div className="mb-5">
            <label className="text-gray-600 block mb-2 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={bookingData?.email }
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="mb-5">
            <label className="text-gray-600 block mb-2 text-sm">Phone</label>
            <input
              type="tel"
              name="phone"
              value={bookingData?.phone }
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
          <div className="flex justify-center">
            <button type ="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition">
                Book Now
            </button>
          </div>
        </form> 
        <CancellationPolicy
            refundable={policy.refundable}
            refundPercentage={policy.refundPercentage}
            allowedUntilDaysBefore={policy.allowedUntilDaysBefore}
            cancellationFee={policy.cancellationFee}
            terms={policy.terms}
         />
         </div>
      </div>
     <Footer />
    </div>
  </>
);
}

export default Booking;
