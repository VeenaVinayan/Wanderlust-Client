import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Pen } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { TBookingResponse } from '../../types/bookingTypes';
import { TReview } from '../../types/userTypes';
import { RootState } from '../../app/store';
import { addReview, getReview, deleteReview  } from '../../services/User/UserServices';
import useSweetAlert from '../../hooks/CustomHooks/SweetAlert';
import { cancelBooking } from '../../services/Booking/BookingService';
import { editReview } from '../../services/User/UserServices';
import ItineraryPdf from '../../utils/Pdf/ItineraryPdf'; 
import  InvoicePdf from '../../utils/Pdf/InvoicePdf';

import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { TPdfProps} from '../../types/packageTypes';
import { TBookingPdfProps} from '../../types/bookingTypes';

const BookingDetails: React.FC = () => {
  const [bookingValue, setBookingValue] = useState<TBookingResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [editRating, setEditRating] = useState(0);
  const [review, setReview] = useState <TReview | null>();
  const [ isEditModal, setIsEditModal ] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<TReview>();
  const user = useSelector((state: RootState) => state.userData);
  const location = useLocation();
  const bookingData = location.state;
  const { showConfirm } = useSweetAlert();

  useEffect(() => {
      setBookingValue(bookingData);
      console.log('Booking DAta ::',bookingData);
      const fetchReviewData = async (userId: string, packageId: string) => {
      const data = await getReview(userId, packageId);
      setReview(data);
      setEditRating(data.rating);
      setValue('review', data.review);
      setValue('rating',data.rating);
    };
    if(bookingData) {
        fetchReviewData(user.id, bookingData.packageId._id);
    }
  },[bookingData, user.id,setValue]);

  const handleDownloadPDF = async () => {
    console.log('Download PDF !!',bookingValue?.packageId?.itinerary);
    if (!bookingValue?.packageId?.itinerary) {
      toast.error('No itinerary available for this booking.');
      return;
    }
    const Itinerary: TPdfProps = {
      title : bookingValue?.packageId.name || 'Itinerary',
      day:  bookingValue.packageId.day || 0,  
      night: bookingValue?.packageId.night || 0,
      itinerary: bookingValue?.packageId.itinerary || [],
    }
    const blob = await pdf(
      <ItineraryPdf {...Itinerary} />
    ).toBlob();
    saveAs(blob, 'Itinerary.pdf');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) reset();
  };
  const handleCancelBooking = async () => {
       console.log('Cancel Booking !!',bookingValue);
       if(bookingValue){
       const response = await cancelBooking(bookingValue._id);
       if(response.success){
         setBookingValue((prev) => {
             if (!prev) return null; 
              return {
                    ...prev,
                    tripStatus: 'Cancelled',
                 };
          });
           console.log("Booking Value ==",bookingValue);
         toast.success(response.message);
        }else{
           toast.error(response.message);
        }
     }
  };
 const onSubmit = async (data: TReview) => {
    toggleModal();
    if (bookingValue) {
      const result = await addReview({ ...data, rating }, user.id, bookingValue.packageId._id);
      toast.success(result.message);
      setReview({ ...data, rating, _id: result.reviewId });
    }
  };
 const handleDelete = async (id: string) => {
    console.log('Delete review :',id);
    
  const response = await deleteReview(id);
    if (response) {
      toast.success('Successfully Delete Review !!');
      setReview(null);
    } else {
      toast.error('Failed to delete review');
    }
  };
const handleEditSubmit = async (data: TReview) => {
  setIsEditModal(false);
  console.log('Edit Review ::', data);
  if (review && bookingValue) {
    const result = await editReview(data, review._id);
    console.log('Edit Review Result:', result);
    setReview({
      ...review,
      review: data.review,
      rating: data.rating,
    });
    toast.success(result);
  }
};
  const handleInvoice = async () =>{
    console.log('Download INVoice PDF !!');
    const booking: TBookingPdfProps = {
      title : bookingValue?.packageId.name || 'Package' ,
      day:  bookingValue?.packageId.day || 0,  
      night: bookingValue?.packageId.night || 0,
      price: bookingValue?.packageId.price || 0,
      totalGuest: bookingValue?.totalGuest || 0,
      tripDate: bookingValue?.tripDate || new Date(),
      email: bookingValue?.email || '',
      name: user.name || '',
      bookingId: bookingValue?.bookingId || '',
      phone: bookingValue?.phone || '',
      adult:bookingValue?.travellers.adult|| 1,
      children:bookingValue?.travellers.children || 0,
      infant:bookingValue?.travellers.infant || 0,
      tripDate:bookingValue?.tripDate || new Date(),
      bookingDate: bookingValue?.bookingDate || new Date(),
    }
    const blob = await pdf(
      <InvoicePdf {...booking} />
    ).toBlob();
    saveAs(blob, 'Invoice.pdf');
  }
  const StarRating = ({ rating, setRating }: { rating: number; setRating: (value: number) => void }) => {
    const [hovered, setHovered] = useState<number | null>(null);
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => {
          const starIndex = index + 1;
          return (
            <svg
              key={starIndex}
              xmlns="http://www.w3.org/2000/svg"
              fill={starIndex <= (hovered || rating) ? 'yellow' : 'gray'}
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="cursor-pointer"
              onMouseEnter={() => setHovered(starIndex)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setRating(starIndex)}
            >
              <path d="M12 2L15 8H9L12 2ZM12 3.5L14.1 7.5H9.9L12 3.5ZM17.3 9.2L20.5 15H13.3L10 14L7 10L3.8 16.5H15.5L17.3 9.2ZM6 18.4L3.5 13.3H9.4L6 18.4ZM12 22L8.4 14.6L15.6 14.6L12 22Z" />
            </svg>
          );
        })}
      </div>
    );
  };

  if (!bookingValue) return null;

  return (
    <> 
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-600">Booking Details</h1>
      <div className='flex items-center justify-between mb-2'>
      { (bookingValue?.tripStatus === 'Pending') && (
        <button
          onClick={() => showConfirm("Cancel Booking !","Are you sure to cancel Booking ?", handleCancelBooking)}
          className="flex items-center gap-2 justify-center py-2 px-4 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancel Booking
        </button>
      )}
      <button 
            className='flex items-center gap-2 justify-end py-2 px-4 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out mb-4'
            onClick={handleInvoice}>
          Invoice
      </button>
      </div>
      <div>
         <h2 className="text-2xl font-semibold text-gray-700 mb-4">{bookingValue?.packageId.name}</h2>
      </div>

      <div className="w-full h-64 mb-8">
        <img
          src={bookingValue?.packageId.images[0] || 'https://via.placeholder.com/600x400'}
          alt="Package"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Package Description</h2>
        <p className="text-gray-600 leading-relaxed">
          {bookingValue?.packageId.description || 'No description available for this package.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <span className="text-gray-500 mb-1">Booking ID</span>
          <span className="text-lg font-bold">{bookingValue?.bookingId || 'N/A'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 mb-1">Traveler Count</span>
          <span className="text-lg font-bold">{bookingValue?.totalGuest || 'N/A'}</span>
        
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 mb-1">Travellers</span>
            <div>
             <span className="text-md font-bold">Adult : {bookingValue?.travellers.adult} </span>
             <span className="text-gray-500 mb-1"> | </span> 
             <span className="text-md font-bold">Children : {bookingValue?.travellers.children} </span> 
             <span className="text-gray-500 mb-1"> | </span> 
             <span className="text-md font-bold">Infant : {bookingValue?.travellers.infant} </span>
          </div>
          
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 mb-1">Email</span>
          <span className="text-lg font-bold">{bookingValue?.email || 'N/A'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 mb-1">Phone</span> 
          <span className="text-lg font-bold">{bookingValue?.phone || 'N/A'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 mb-1">Total Amount</span>
          <span className="text-lg font-bold">₹ {bookingValue?.totalAmount || '0'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 mb-1">Payment Status </span>
          <span className="text-lg font-bold">{bookingValue?.paymentStatus}</span>
        </div>
         { bookingValue?.tripStatus ==="Cancelled" && 
            <div className="flex flex-col">
              <span className="text-gray-500 mb-1">Refund Amount</span>
              <span className={`text-lg font-bold`}>
                {Math.floor(bookingValue?.totalAmount *.8)}
              </span>
            </div>
         }
        <div className="flex flex-col">
          <span className="text-gray-500 mb-1">Trip Date : </span>
          <span className="text-lg font-bold">{new Date(bookingValue.tripDate)?.toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 mb-1">Booking Date </span>
          <span className="text-lg font-bold">{new Date(bookingValue.bookingDate).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 mb-1">Booking Status</span>
          <span className={`text-lg font-bold ${bookingValue?.tripStatus === 'Completed' ? 'text-gray-600' : 'text-red-600'}`}>
            {bookingValue?.tripStatus || 'Pending'}
          </span>
        </div>
     </div>
     {(bookingValue?.tripStatus !== 'Cancelled' && bookingValue?.tripStatus !== 'Completed') && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow hover:bg-gray-600 transition"
          >
             Itinerary 
          </button>
        </div>
      )}
    { (bookingValue?.tripStatus === 'Completed' && !review) && (
        <button
          onClick={toggleModal}
          className="flex items-center gap-2 justify-center py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 hover:scale-105 transition-transform duration-300 ease-in-out mt-6"
        >
          <Pen className="w-5 h-5" /> Add Review
        </button>
      )}

      {review && (
        <div className="relative flex flex-col border rounded-2xl p-4 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 mt-6">
          <div className="absolute top-2 right-2 flex space-x-2">
           <button
              onClick={() => setIsEditModal(true)}
              className="p-1 rounded-full hover:bg-gray-100 transition"
              aria-label="Edit review"
            >
              ✏️
            </button>
            <button
              onClick={() => handleDelete(review._id)}
              className="p-1 rounded-full hover:bg-red-100 transition"
              aria-label="Delete review"
            >
              🗑️
            </button>
          </div>
          <span className="text-sm text-gray-500 mb-2">Review</span>
          <p className="text-2xl font-semibold text-yellow-500 mb-1">⭐ {review.rating}</p>
          <p className="text-gray-700 break-words">{review.review}</p>
        </div>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={toggleModal} title="Add Review and Ratings!">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm text-gray-600">Rating (1-5)</label>
              <StarRating rating={rating} setRating={setRating} />
              <input
                type="hidden"
                value={rating}
                {...register('rating', { required: 'Rating is required' })}
              />
              {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="review" className="block text-sm text-gray-600">Review</label>
              <textarea
                id="review"
                rows={4}
                {...register('review', { required: 'Review is required' })}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                placeholder="Write your review here"
             />
              {errors.review && <p className="text-red-500 text-xs mt-1">{errors.review.message}</p>}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={toggleModal}
                className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Submit Review
              </button>
            </div>
          </form>
        </Modal>
      )}
   
  {isEditModal && (
  <Modal isOpen={isEditModal} closeModal={() => setIsEditModal(false)} title="Edit Review and Ratings !">
    <form onSubmit={handleSubmit(handleEditSubmit)}>
      {/* Rating Field */}
      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm text-gray-600">Rating (1-5)</label>
        <StarRating rating={editRating} setRating={(value) =>{ 
                         setEditRating(value); 
                         setValue('rating',value); 
                         setRating(value) }} />
        <input
          type="hidden"
          value={rating}
         {...register('rating', { required: 'Rating is required' })}
        />
        {errors.rating && (
          <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="review" className="block text-sm text-gray-600">Review</label>
        <textarea
          rows={4}
          {...register('review', { required: 'Review is required' })}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md"
        />
        {errors.review && (
          <p className="text-red-500 text-xs mt-1">{errors.review.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsEditModal(false)}
          className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Edit Review
        </button>
      </div>
    </form>
  </Modal>
)}
</div>
</>
  );
};

export default BookingDetails;
