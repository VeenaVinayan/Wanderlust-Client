import React , { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { TPackageAllData } from '../../types/packageTypes';
import { User ,Phone, MailIcon} from "lucide-react";
import { verifyPackage } from '../../services/Admin/Dashboard';
import { toast} from 'react-toastify';
import { ItineraryItem } from '../../types/packageTypes';

const PackageView : React.FC= () => {
const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const toggleDay = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index);
  };
  const [ packageData , setPackageData ] = useState<TPackageAllData>({
    _id:'',
    name:'',
    description: '',
    price:0,
    day:0,
    night:0,
    images:[],
    category:'',
    status:true,
    itinerary:[{
        day:0,
        description:'',
        meals:[],
        activities:'',
        stay:'',
        transfer:'',
    }],
    coordinates:{
      latitude:0,
      longitude:0,
    },
    isVerified:'',
    agent:{
       _id:'',
       name:'',
       phone:'',
       email:'',
    },
    totalCapacity:0,
  }) 
  const location = useLocation();
  const  travelPackage  = location.state;
  console.log("Package Data in views ::",travelPackage);

  useEffect(() =>{
    if(packageData){
        setPackageData(travelPackage);
    }
   },[]);

  const onVerify = async(packageId : string) =>{
    if(!packageId) return;
     const response = await verifyPackage(packageId,"Approved");
     if(response){
       toast.success('Package Verified Successfully !!');
       setPackageData((prev) => ({ ...prev, isVerified: "Approved" }));
     } else {
       console.error('Failed to verify package');
     }  
  }
  const onReject = async (packageId : string) =>{
     if(!packageId) return;
     const response = await verifyPackage(packageId,"Reject");
     if(response){
       toast.success('Package Verified Successfully !!');
       setPackageData((prev) => ({ ...prev, isVerified: "Approved" }));
     } else {
       console.error('Failed to verify package');
     } 
   }
return (
<div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-6 space-y-8">
 <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">{packageData.name}</h2>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div className="md:col-span-2 md:row-span-2">
      <img
        src={packageData.images[0]}
        alt="Main"
        className="w-full h-full object-cover rounded-2xl shadow-md"
      />
    </div>
    {packageData.images.slice(1, 5).map((image, idx) => (
      <img
        key={idx}
        src={image}
        alt={`Gallery ${idx + 1}`}
        className="w-full h-32 object-cover rounded-2xl shadow"
      />
    ))}
  </div>

  {packageData.isVerified === "Pending" && (
    <div className="flex gap-4">
      <button
        onClick={() => onVerify(packageData._id || "")}
        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full shadow transition duration-200"
      >
        ✅ <span>Verify</span>
      </button>
      <button
        onClick={() => onReject(packageData._id || "")}
        className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow transition duration-200"
      >
        ❌ <span>Cancel</span>
      </button>
    </div>
  )}

  <p className="text-gray-600 text-lg leading-relaxed">{packageData.description}</p>
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
    <div className="text-xl font-semibold text-green-600">
      Price: ₹ {packageData.price}
    </div>
    <div className="text-gray-700 text-lg">
      Duration: <strong>{packageData.day} Days / {packageData.night} Nights</strong>
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
  <div className="w-full max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-2xl shadow-md">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Agent Details</h2>
    <div className="space-y-3 text-gray-700">
      <div className="flex items-center gap-2">
        <User className="w-5 h-5 text-pink-500" />
        <span className="font-medium">Name:</span>
        <span>{packageData.agent.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="w-5 h-5 text-pink-500" />
        <span className="font-medium">Phone:</span>
        <span>{packageData.agent.phone}</span>
      </div>
      <div className="flex items-center gap-2">
        <MailIcon className="w-5 h-5 text-pink-500" />
        <span className="font-medium">Email:</span>
        <span>{packageData.agent.email}</span>
      </div>
    </div>
  </div>
</div>

  )
}

export default PackageView
