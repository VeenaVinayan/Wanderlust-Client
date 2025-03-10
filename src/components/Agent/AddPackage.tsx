// import React, { useState } from 'react'
// import { TPackage } from '../../types/packageTypes';


// const AddPackage: React.FC = () => {
   
//    const [packageData, setPackageData ] = useState<TPackage>({
//     name:'',
//     description: '',
//     price:0,
//     day:0,
//     night:0,
//     images:[],
//     category:'',
//     itinery:{
//         day:0,
//         decription:'',
//         meals:[],
//         activities:'',
//         stay:'',
//         transfer:'',
//         location:'',
//     }
//    });
//    const category = ["Beach", "Religious","HoneyMoon","Vaction","Hillstation","Trekking"];
//    const handleSubmit = (e: React.FormEvent) =>{
//         console.log("Form for add packages !!");
//         e.preventDefault();
//    } 
//    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>{
//       console.log("Handle change .... update value ....");
//       const { name, value }= e.target;
//       setPackageData((prev) => ({...prev, [name]: value}));
//    }

//   return (
//     <>
//     <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-lg mt-10">
//      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Package</h2>
//      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
//      <div>
//       <label className="block text-gray-600 font-medium">Package Name</label>
//        <input  type="text" 
//                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" 
//                placeholder="Enter package name" 
//                name='name'
//                value={packageData.name}
//                onChange={handleChange}
//             />
//       </div>
//       <div>
//        <label className="block text-gray-600 font-medium">Description</label>
//          <textarea  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200" 
//                 type="text"
//                 name="description"
//                 onChange={handleChange}
//                 value={packageData.description}
//                 placeholder="Enter category" />
//      </div>
//      <div>
//         <label className="block text-gray-600 font-medium">Category</label>
//          <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
//                 value={packageData.category} 
//                 name="category"
//                 onChange={handleChange}  >
//             <option value="">-select- </option>
//             { category.map((type,index) => (
//                 <option key={index} value={type.toLocaleLowerCase()}>
//                     {type}
//                 </option>
//             ))}
//          </select>           
//      </div>
//      <div> 
//      <label className="block text-gray-600 font-medium">Duration</label>
//      <div className="flex items-center gap-4">
//       <div className="flex items-center gap-2">
//        <label className="text-gray-600 font-medium">Day:</label>
//        <input
//       className="w-16 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-center"
//       placeholder="0"
//       type="number"
//       name="day"
//       value={packageData.day}
//       onChange={handleChange}
//     />
//   </div>
//  <div className="flex items-center gap-2">
//     <label className="text-gray-600 font-medium">Night:</label>
//     <input
//       className="w-16 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
//       placeholder="0"
//       type="number"
//       name="night"
//       value={packageData.night}
//       onChange={handleChange}
//     />
//   </div>
// </div>

//   <div className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-blue-500 transition duration-200 cursor-pointer">
//    <label className="flex flex-col items-center gap-2 cursor-pointer">
//      <svg className="w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V12M7 12V8m0 4h10m-5-6v12" />
//      </svg>
//    <span className="text-sm font-medium text-gray-600">Click to upload image</span>
//    <span className="text-xs text-gray-400">PNG, JPG, JPEG (Max 5MB)</span>
//   </label>
//   <input type="file" accept="image/*" className="hidden" />
//   </div>
//   <div>
//     <label className="block text-gray-600 font-medium">Itinerary</label>
//   </div>
//     <div className="col-span-2">
//       <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all">Add Package</button>
//     </div>
// <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//   <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-2">Itinerary</h2>
//   <div>
//       <label className="block text-gray-700 font-medium">Day</label>
//       <input type="text" placeholder="e.g., Day 1" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//     </div>

//     <div>
//       <label className="block text-gray-700 font-medium">Description</label>
//       <textarea placeholder="Enter a brief description" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
//     </div>
//     <div>
//       <h4 className="block text-gray-700 font-medium mb-2">Includes</h4>
//       {/* <div class="space-y-2">
//         <label class="flex items-center space-x-2">
//           <input type="checkbox" class="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500" />
//           <span class="text-gray-600">Meals</span>
//         </label>
//         <label class="flex items-center space-x-2">
//           <input type="checkbox" class="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500" />
//           <span class="text-gray-600">Stay</span>
//         </label>
//         <label class="flex items-center space-x-2">
//           <input type="checkbox" class="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500" />
//           <span class="text-gray-600">Transfers</span>
//         </label> */}
//       </div>
//     </div>

//     <div>
//       <label className="block text-gray-700 font-medium">Activities</label>
//       <input type="text" placeholder="e.g., City Tour, Sightseeing" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//     </div>
//     <div className="flex justify-end">
//       <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition">Save Itinerary</button>
//     </div>
//   </div>
//  </form>
//  </div>
//  </>
// )
// }
// export default AddPackage
import React, { useState } from "react";
import { TPackage } from "../../types/packageTypes";

const AddPackage: React.FC = () => {
  const [packageData, setPackageData] = useState({
    name: "",
    description: "",
    price: 0,
    day: 0,
    night: 0,
    images: [],
    category: "",
    itinerary: [{
       day:0,
       meals:[],
       activities:"",
       stay:'',
       transfer:''
    }

    ],
  });

  const category = ["Beach", "Religious", "Honeymoon", "Vacation", "Hillstation", "Trekking"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPackageData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItineraryChange = (index: number, field: string, value: string | string[]) => {
    const updatedItinerary = [...packageData.itinery];
    updatedItinerary[index] = { ...updatedItinerary[index], [field]: value };
    setPackageData((prev) => ({ ...prev, itinery: updatedItinerary }));
  };

  const addItineraryDay = () => {
    setPackageData((prev) => ({
      ...prev,
      itinery: [
        ...prev.itinery,
        {
          day: prev.itinery.length + 1,
          description: "",
          meals: [],
          activities: "",
          stay: "",
          transfer: "",
          location: "",
        },
      ],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Package Data:", packageData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Package</h2>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* Package Name */}
        <div>
          <label className="block text-gray-600 font-medium">Package Name</label>
          <input type="text" name="name" value={packageData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Enter package name" />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-gray-600 font-medium">Description</label>
          <textarea name="description" value={packageData.description} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Enter description" />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-600 font-medium">Category</label>
          <select name="category" value={packageData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400">
            <option value="">-Select-</option>
            {category.map((type, index) => (
              <option key={index} value={type.toLowerCase()}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-gray-600 font-medium">Duration</label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-gray-600 font-medium">Day:</label>
              <input type="number" name="day" value={packageData.day} onChange={handleChange} className="w-16 px-2 py-1 border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-gray-400" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-600 font-medium">Night:</label>
              <input type="number" name="night" value={packageData.night} onChange={handleChange} className="w-16 px-2 py-1 border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-gray-400" />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="col-span-2 flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-blue-500 transition duration-200 cursor-pointer">
          <label className="flex flex-col items-center gap-2 cursor-pointer">
            <svg className="w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V12M7 12V8m0 4h10m-5-6v12" />
            </svg>
            <span className="text-sm font-medium text-gray-600">Click to upload image</span>
            <span className="text-xs text-gray-400">PNG, JPG, JPEG (Max 5MB)</span>
          </label>
          <input type="file" accept="image/*" className="hidden" />
        </div>

        {/* Itinerary Section */}
        <div className="col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Itinerary</h2>

          {packageData.itinery.map((day, index) => (
            <div key={index} className="p-4 mb-4 border rounded-lg bg-gray-50">
              <div>
                <label className="block text-gray-700 font-medium">Day {day.day}</label>
                <input type="text" value={day.description} onChange={(e) => handleItineraryChange(index, "description", e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter description" />
              </div>

              {/* <div className="mt-2">
                <label className="block text-gray-700 font-medium">Meals</label>
                <input type="text" value={day.meals.join(", ")} onChange={(e) => handleItineraryChange(index, "meals", e.target.value.split(","))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g., Breakfast, Lunch" />
              </div> */}
              <div className="mt-2">
  <label className="block text-gray-700 font-medium">Meals</label>
  <div className="grid grid-cols-2 gap-2">
    {["Breakfast", "Lunch", "Snacks", "Dinner"].map((meal) => (
      <label key={meal} className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={day.meals.includes(meal)}
          onChange={(e) => {
            const updatedMeals = e.target.checked
              ? [...day.meals, meal]
              : day.meals.filter((m) => m !== meal);
            handleItineraryChange(index, "meals", updatedMeals);
          }}
          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="text-gray-600">{meal}</span>
      </label>
    ))}
  </div>
</div>

           <div className="mt-2">
                <label className="block text-gray-700 font-medium">Activities</label>
                <input type="text" value={day.activities} onChange={(e) => handleItineraryChange(index, "activities", e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g., City Tour, Sightseeing" />
              </div>
            </div>
          ))}

          <button type="button" onClick={addItineraryDay} className=" w-32 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all">
            + Add Day
          </button>
        </div>

        <div className="col-span-2">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all">
            Add Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
