import React , { useState , useEffect} from 'react';
import Header from '../../components/layout/Shared/Header'
import Footer from '../../components/layout/Shared/Footer';
import { useLocation } from 'react-router-dom';
import { PackageInitialState } from '../../Constants/InitialState';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TBookingData } from '../../types/bookingTypes';
import schema from '../../Validations/Booking'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ValidationError } from 'yup';
// import { validateBooking } from '../../services/Booking/BookingService';
// import { toast } from 'react-toastify';

const Booking : React.FC = ()  => {
  const [packageValue, setPackageValue ] = useState(PackageInitialState);
  const navigate = useNavigate();
  const location = useLocation();
  const packageData = location.state;
  const {email ,phone} = useSelector((state: RootState) => state.userData);
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
    totalAmount: packageValue.price || 0,
  });
  useEffect(() =>{
     setPackageValue(packageData);
     setBookingData(prev =>({
       ...prev, totalAmount: packageData.price || 0,
   }))
  },[packageData]);

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
  const handleDateChange = (date: Date) => {
     setBookingData((prev) => ({ ...prev, tripDate: date }));
  };
  const handleSubmit= async (e: React.FormEvent) =>{
     e.preventDefault();
 try{
     await schema.validate(bookingData, { abortEarly: false })
     console.log('Booking Data : ', bookingData);
    //  const response = await validateBooking(bookingData);
    //  if(response.success){
        navigate('/user/payment', { state: { bookingData, packageValue } });
    //  }else{
    //     toast.error('Validation Faild ! ',response.message);
    //     return;
    //  }
 }catch (err: unknown) {
  if (err instanceof ValidationError) {
    console.log("Errors ::",err);
    const newErrors: Record<string, string> = {};
    err.inner.forEach((e) => {
      if (e.path) {
        newErrors[e.path] = e.message;
      }
    });
    console.log('Error occured ::',newErrors);
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
            {packageValue.name}
          </h2>
          <img
            src={packageValue.images[2]}
            alt={packageValue.name}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-md"
          />
         <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">
              {packageValue.day} Days / {packageValue.night} Nights
            </span>
            <span className="text-xl font-semibold text-indigo-600">
              ₹ {packageValue.price.toLocaleString()}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholderText="Choose a date"
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

          {/* Email */}
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

          {/* Phone */}
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
       </div>
      </div>
     <Footer />
    </div>
  </>
);
}

export default Booking;
