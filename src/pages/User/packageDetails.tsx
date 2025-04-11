// import React, { useState } from "react";
// import { MapPin,IndianRupee, CalendarDays} from "lucide-react";
// import { useLocation } from "react-router-dom";
// import { TPackage } from "../../types/packageTypes";
// import Header from '../../components/layout/Shared/Header';

// const PackageDetails: React.FC = () => {
//   const [expandedDay, setExpandedDay] = useState<number | null>(null);
//   const location = useLocation();
//   const packageData: TPackage  = location.state;
//   const [selectedImage, setSelectedImage] = useState([]);
//   console.log("Package Data :: in Package Details Page ::: ", packageData);
//   const toggleDay = (index: number) => {
//     setExpandedDay(expandedDay === index ? null : index);
//   };
  
//   if (!packageData) {
//     return <p className="text-center text-red-500 text-xl mt-10">Package details not available.</p>;
//   }
  
//   return (
//     <div className="min-h-screen flex flex-col">
//     <Header />
//     <div className="container mx-auto px-6 sm:px-6 lg:px-20 xl:px-32 py-10">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Image Gallery */}
//         <div className="flex flex-col items-center">
//           <img
//             src={selectedImage}
//             alt="Selected Package"
//             className="w-full h-72 md:h-96 object-cover rounded-xl shadow-lg"
//           />
//           <div className="flex gap-3 mt-4 overflow-x-auto">
//             {packageData.images.map((img: string, index: number) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`Thumbnail ${index + 1}`}
//                 className={`h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-lg cursor-pointer border-2 transition ${
//                   selectedImage === img ? "border-blue-500 scale-105" : "border-transparent hover:scale-105"
//                 }`}
//                 onClick={() => setSelectedImage(img)}
//               />
//             ))}
//           </div>
//         </div>
//        {/* Package Info */}
//         <div className="space-y-4">
//           <h1 className="text-2xl sm:text-3xl font-bold">{packageData.name}</h1>
//           <p className="text-gray-700 text-base sm:text-lg">{packageData.description}</p>
//           <div className="flex flex-wrap gap-6 text-lg font-semibold">
//             <div className="flex items-center gap-2">
//               <IndianRupee className="w-5 h-5 text-green-500" />
//               <span>{packageData.price}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <CalendarDays className="w-5 h-5 text-blue-500" />
//               <span>{packageData.day} Days</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <CalendarDays className="w-5 h-5 text-blue-500" />
//               <span>{packageData.night} Nights</span>
//             </div>
//           </div>
//         </div>
//       </div>

//      {/* Itinerary Section */}
//       <div className="mt-10 w-75">
//         <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
//       <div className="mt-10">
    
//      <div className="space-y-4">
//       { packageData.itinerary.length > 0 ? (
//         packageData.itinerary.map((day: object , index : number) => (
//         <div key={index} className="border-l-4 border-blue-500 bg-gray-50 shadow rounded-lg transition hover:shadow-lg">
//           <button
//             onClick={() => toggleDay(index)}
//             className="w-full text-left p-4 font-semibold flex justify-between items-center bg-white rounded-t-lg"
//           >
//             <span className="text-lg">Day {index + 1}: {day.title}</span>
//             <span className="text-blue-500">{expandedDay === index ? "▲" : "▼"}</span>
//           </button>

//           {/* Expandable Section */}
//           {expandedDay === index && (
//             <div className="p-4 space-y-2">
//               <p className="text-gray-700">{day.details}</p>
//               <h4 className="font-semibold">Activities:</h4>
//               <p className="text-gray-600">{day.activities}</p>
//              ) 
//               {day.meals && (
//                 <div>
//                   <h4 className="font-semibold">Meals:</h4>
//                   <ul className="list-disc ml-5 text-gray-600">
//                     {day.meals.map((meal: string, i: number) => (
//                       <li key={i}>{meal}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               <div>
//                  <h4 className="font-semibold">Stay:</h4>
//                  <p className="list-disc ml-5 text-gray">{day.stay}</p>
//               </div>
//               {day.transfer && (
//                 <div>
//                   <h4 className="font-semibold">Transfer:</h4>
//                   <p className="text-gray-600">{day.transfer}</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       ))
//     ) : (
//       <p className="text-gray-500">No itinerary available.</p>
//     )}
//     </div>
//   </div>
//   </div>
//    {/* Map Section */}
//    <div className="mt-10 w-50">
//         <h2 className="text-2xl font-bold mb-4">Location</h2>
//         <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
//           <MapPin className="w-10 h-10 text-gray-500" />
//           <span className="ml-2 text-gray-700">{packageData.location || "Unknown Location"}</span>
//         </div>
//    </div>
//  </div>
//  </div>
//   );
// };

// export default PackageDetails;

import React, { useState } from "react";
import { IndianRupee, CalendarDays } from "lucide-react";
import { useLocation } from "react-router-dom";
import { TPackage } from "../../types/packageTypes";
import Header from "../../components/layout/Shared/Header";
import Footer from '../../components/layout/Shared/Footer';

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
  const location = useLocation();
  const packageData: TPackage = location.state;

  const toggleDay = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  if (!packageData) {
    return (
      <p className="text-center text-red-500 text-xl mt-10">
        Package details not available.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
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

          {/* Package Info */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold">{packageData.name}</h1>
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
          </div>
        </div>

        {/* Itinerary Section */}
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

        {/* Map Section */}
        {/* <div className="mt-10 w-full">
          <h2 className="text-2xl font-bold mb-4">Location</h2>
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
            <MapPin className="w-10 h-10 text-gray-500" />
            <span className="ml-2 text-gray-700">
              {packageData.location || "Unknown Location"}
            </span>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default PackageDetails;
