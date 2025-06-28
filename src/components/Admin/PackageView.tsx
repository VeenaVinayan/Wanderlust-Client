import React , { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { TPackage } from '../../types/packageTypes';
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { verifyPackage } from '../../services/Admin/Dashboard';
import { toast} from 'react-toastify';

const PackageView : React.FC= () => {
  const [openDay, setOpenDay] = useState<number | null>(null);
  const toggleDay = (index: number) => {
    setOpenDay(openDay === index ? null : index);
  };
  const [ packageData , setPackageData ] = useState<TPackage>({
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
    isVerified:false,
    agent:'',
    totalCapacity:0,
  }) 
  const location = useLocation();
  const  travelPackage  = location.state;
  console.log("Package Data in views ::",travelPackage);

  useEffect(() =>{
    if(packageData){
        setPackageData(travelPackage);
    }
   }, []);

  const onVerify = async(packageId : string) =>{
     console.log('Verify Package !',packageId);
     const response = await verifyPackage(packageId);
     if(response){
       toast.success('Package Verified Successfully !!');
       setPackageData((prev) => ({ ...prev, isVerified: true }));
     } else {
       console.error('Failed to verify package');
     }  
  }
  const onReject = (packageId : string) =>{
      console.log('Reject Package !',packageId);
  }
  return (
  <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
    <h2 className="text-3xl font-bold text-gray-600 tracking-wide">
      {packageData.name}
    </h2>

   <div className="grid grid-cols-4 gap-2 p-4">
  
  <div className="col-span-2 row-span-2">
      <img src={packageData.images[0]} alt="Main Image" className="w-full h-full object-cover rounded-lg" />
    </div>
    { packageData.images.map((image) => ( 
        <img src={ image} alt="Gallery 1" className="w-full h-32 object-cover rounded-lg"/>
    ))
    }
 </div>
   <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-800">{packageData.name}</h2>
    {!packageData.isVerified && (
        <div className="flex gap-2">
          <button
            onClick={() => onVerify(packageData._id)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            ✅ Verify
          </button>
          <button
            onClick={() => onReject(packageData._id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            ❌ Cancel
          </button>
        </div>
      )}
    <p className="text-gray-500 mt-2">{packageData.description}</p>
    
    <div className="mt-4 flex items-center justify-between">
      <span className="text-lg font-semibold text-green-600">{packageData.price}</span>
      <span className="text-gray-700">Duration: <strong>{packageData.day} {packageData.night}</strong></span>
    </div>

    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800">Itinerary</h3>
      <ul className="mt-2 space-y-2 text-gray-600">
  
      { packageData.itinerary.map((day) => (
        <li key={day.day} className="rounded-xl border bg-white shadow-md p-4">
          <button
            className="flex justify-between items-center w-full text-lg font-semibold text-gray-800 px-4 py-2 hover:bg-gray-100 rounded-lg transition"
            onClick={() => toggleDay(day.day)}
          >
            <span>Day {day.day}</span>
            {openDay === day.day ? (
              <ChevronUp className="text-gray-500" />
            ) : (
              <ChevronDown className="text-gray-500" />
            )}
          </button>

          {/* Expandable Content */}
          {openDay === day.day && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 p-4 bg-gray-50 border rounded-lg"
            >
              <p className="text-gray-700">{day.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 text-sm bg-blue-100 text-gray-600 rounded-lg">
                  {day.activities}
                </span>
                {day.meals.map((meal: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg"
                  >
                    {meal}
                  </span>
                ))}
                <span className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-lg">
                  Stay: {day.stay}
                </span>
                <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-600 rounded-lg">
                  Transfer: {day.transfer}
                </span>
              </div>
            </motion.div>
          )}
        </li>
      ))}
    </ul>
    </div>
  
  </div>
</div>

  )
}

export default PackageView
