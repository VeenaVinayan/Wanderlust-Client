import React, { useState ,useEffect } from "react";
import { IndianRupee, CalendarDays, Star } from "lucide-react";
import { useLocation } from "react-router-dom";
import { TPackage } from "../../types/packageTypes";
import Header from "../../components/layout/Shared/Header";
import Footer from '../../components/layout/Shared/Footer';
import { useNavigate } from 'react-router-dom';
import { getReviews } from '../../services/User/UserServices';
import CancellationPolicy from "../../components/User/CancellationPolicy";
import { policy } from '../../Constants/Packages';
import { TReviews } from '../../types/packageTypes';

type ItineraryItem = {
   day: number;
   description: string;
   meals?: string[];
   activities: string;
   stay?: string;
   transfer?: string;
};
const PackageDetails: React.FC = () => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [ reviews, setReviews] = useState<TReviews[]>([]);
  const [rating, setRating] = useState(0);
  const location = useLocation();
  const packageData: TPackage = location.state;
  const navigate = useNavigate();
  const toggleDay = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index);
  };
  useEffect(() =>{
     const fetchData = async (packageId : string) =>{
          const response = await getReviews(packageId);
          console.log('Reviews !!',response);
          setReviews(response);
          handleRating(response);
     }
     if(packageData && packageData._id) {
         fetchData(packageData._id);
     }
  },[]);
  if (!packageData) {
    return (
      <p className="text-center text-red-500 text-xl mt-10">
         Package details not available.
      </p>
    );
  }
 const handleRating = (review : TReviews []) => {
  console.log("Reviews ::",review);
  const total = review.length;
  console.log("Rating = ,total");
  if (total === 0) {
    setRating(0);
    return;
  }
  const sumRating = review.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = Math.floor(sumRating / total);
  setRating(averageRating);
};

function renderStars(rating :number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      // full star
      stars.push(
        <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
      );
    } else if (i - rating < 1) {
      // half star (optional: you can use a half-star icon or style)
      stars.push(
        <Star key={i} size={16} className="text-yellow-400" fill="currentColor" style={{ opacity: 0.5 }} />
      );
    } else {
      // empty star
      stars.push(
        <Star key={i} size={16} className="text-gray-300" fill="none" />
      );
    }
  }
  return <div className="flex gap-1">{stars}</div>;
}

 return (
    <div className="min-h-screen flex flex-col m-5">
      <Header />
      <div className="container mx-auto px-6 sm:px-6 lg:px-20 xl:px-32 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="flex flex-col items-center">
            <img
              src={selectedImage || packageData.images[0]}
              alt="Selected Package"
              className="w-full h-72 md:h-96 object-cover rounded-xl shadow-lg"
            />
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {packageData.images.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                    selectedImage === img
                      ? "border-blue-500 scale-105"
                      : "border-transparent hover:scale-105"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold">{packageData.name}</h1>
            <div className="flex items-center gap-2">
                {renderStars(rating)}
               <span className="text-sm text-gray-600">| {rating.toFixed(1)}</span>
            </div>

            <p className="text-gray-700 text-base sm:text-lg">
              {packageData.description}
            </p>
            <div className="flex flex-wrap gap-6 text-lg font-semibold">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-green-500" />
                <span>{packageData.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-500" />
                <span>{packageData.day} Days</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-500" />
                <span>{packageData.night} Nights</span>
              </div>
            </div>
            <button 
                className="bg-gray-600 justify-end text-white font-semibold px-6 py-2 rounded-2xl shadow hover:bg-gray-800 transition duration-300"
                onClick={() => navigate('/user/booking',{state:packageData})} >
               Book Now
            </button>
         </div>
        </div>
                
    
        <div className="mt-10 w-full">
          <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
          <div className="space-y-4">
            {packageData.itinerary.length > 0 ? (
              packageData.itinerary.map((day: ItineraryItem, index: number) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-500 bg-gray-50 shadow rounded-lg transition hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleDay(index)}
                    className="w-full text-left p-4 font-semibold flex justify-between items-center bg-white rounded-t-lg"
                  >
                    <span className="text-lg">
                      Day {day.day}: {day.description}
                    </span>
                    <span className="text-blue-500">
                      {expandedDay === index ? "▲" : "▼"}
                    </span>
                  </button>
                 {expandedDay === index && (
                    <div className="p-4 space-y-2">
                      <h4 className="font-semibold">Activities:</h4>
                      <p className="text-gray-600">{day.activities}</p>

                      {day.meals && (
                        <div>
                          <h4 className="font-semibold">Meals:</h4>
                          <ul className="list-disc ml-5 text-gray-600">
                            {day.meals.map((meal: string, i: number) => (
                              <li key={i}>{meal}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                     {day.stay && (
                        <div>
                          <h4 className="font-semibold">Stay:</h4>
                          <p className="text-gray-600">{day.stay}</p>
                        </div>
                      )}

                      {day.transfer && (
                        <div>
                          <h4 className="font-semibold">Transfer:</h4>
                          <p className="text-gray-600">{day.transfer}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No itinerary available.</p>
            )}
          </div>
        </div>
    
 <div className="mt-8">
  <h4 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Cancellation Policy</h4>
  <div className="m-5 p-6 shadow-xl border rounded-2xl bg-white">
  <CancellationPolicy
    refundable={policy.refundable}
    refundPercentage={policy.refundPercentage}
    allowedUntilDaysBefore={policy.allowedUntilDaysBefore}
    cancellationFee={policy.cancellationFee}
    terms={policy.terms}
  />
  </div>
  </div> 
 { reviews.length > 0 && (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Reviews</h3>

      <div className="space-y-6">
        {reviews.map((value, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-xl shadow-sm border bg-gray-50 hover:shadow-md transition"
          >
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
              {value.userId.name ? value.userId.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                 <h5 className="font-semibold text-gray-700 mb-2 sm:mb-0">{value.userId.name}</h5>
                  <div className="flex items-center gap-2">
                     {renderStars(value.rating)}
                     <span className="text-sm text-gray-600">| {value.rating.toFixed(1)}</span>
                  </div>
                </div>
               <p className="text-sm text-gray-500">
                  {new Date(value.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="mt-2 text-gray-600">{value.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
 </div>
 <Footer />
 </div>
  );
};
export default PackageDetails;
