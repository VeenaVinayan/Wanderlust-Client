import React, { useState , useEffect } from "react";
import { Delete } from "lucide-react";
import { addPackage } from "../../services/Agent/PackageService";
import { TPackageValue } from "../../types/packageTypes";
import { getCategories } from '../../services/Agent/PackageService';
import { TCategoryValue } from "../../types/agentTypes";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import schema from '../../Validations/PackageRegister';
import { ValidationError } from 'yup';
import {  PackageInitialState } from "../../Constants/InitialState";
import { PackageFormError , ItineraryItemError} from '../../types/errorTypes';

const AddPackage: React.FC = ()  => {
  const [files, setFiles] = useState<File[]>([]);
  const [ categories, setCategories ] = useState<TCategoryValue[]>([]);
  const agentData = useSelector((state: RootState) => state.agentSliceData);
  const [ errors, setErrors ] = useState<PackageFormError>({});
  const [packageData, setPackageData] = useState<TPackageValue>(PackageInitialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
    if(['longitude','latitude'].includes(name)){
        setPackageData((prev) => ({
        ...prev,
         coordinates: {
               ...prev.coordinates,
              [name]: value,
          },
        }));
      }
      setPackageData((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  useEffect (() =>{
      const fetchAllCategory = async () =>{
        const data = await getCategories();
        setCategories(data);
      } 
        fetchAllCategory();
  }, []);

 const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
    }
  };
  
  const handleItineraryChange = (index: number, field: string, value: string | string[]) => {
    const updatedItinerary = [...packageData.itinerary];
    updatedItinerary[index] = { ...updatedItinerary[index], [field]: value };
    setPackageData((prev) => ({ ...prev, itinerary: updatedItinerary }));
  };
  const addItineraryDay = () => {
    setPackageData((prev) => ({
      ...prev,
      itinerary: [
      ...prev.itinerary,
        {
          day: prev.itinerary.length > 0 ? prev.itinerary[prev.itinerary.length - 1].day + 1 : 1, // Ensuring day numbering
          description: "",
          meals: [],
          activities: "",
          stay: "Nil",
          transfer: "",
        },
      ],
    }));
  };
  
  const removeItineraryDay = (index: number) => {
    setPackageData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index),
    }));
  };

  const removeImage = (index: number) => {
    setPackageData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }; 
  
  const handleSubmit = async(e: React.FormEvent) => {
   e.preventDefault();
   try{  
     console.log("Package Data:", packageData);
     packageData.images= files;
     packageData.agent= agentData.id;
     await schema.validate(packageData,{ abortEarly: false});
     console.log("Package Data  :::",packageData)
     const response = await addPackage(packageData);
     if(response){
       toast.success("Package created Successfully !!");
       setPackageData(PackageInitialState)
       navigate('/agent/agentDashboard/package');
     }else{
       toast.error("Error occured create Package !!");
     }
   }catch (err) {
    if (err instanceof ValidationError) {
      console.log('Error in package Add ::',err)
      const formattedErrors: PackageFormError = {};
      err.inner.forEach((error) => {
        const path = error.path || "";
        if (!formattedErrors.coordinates) {
          formattedErrors.coordinates = {};
        }
        if (path.startsWith("itinerary")) {
          const match = path.match(/itinerary\[(\d+)\]\.(\w+)/);
          if (match) {
            const index = parseInt(match[1], 10);
            const field = match[2] as keyof ItineraryItemError;

            if (!formattedErrors.itinerary) formattedErrors.itinerary = [];
            if (!formattedErrors.itinerary[index])
              formattedErrors.itinerary[index] = {};
            formattedErrors.itinerary[index]![field] = error.message;
          }
        } else {
          const field = path as keyof PackageFormError;
          formattedErrors[field] = error.message;
        }
      });
      console.log("Errors::",formattedErrors);
      setErrors(formattedErrors);
    }
  }
}
 const cancelHandleClick = (e: React.FormEvent) =>{
       e.preventDefault();
       console.log('Handle Click !!');
  }
  return (
    <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-lg mt-10">
     <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Package</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-600 font-medium">Package Name</label>
          <input type="text" name="name" value={packageData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400" placeholder="Enter package name" />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Description</label>
          <textarea name="description" value={packageData.description} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400" placeholder="Enter Description" />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>

        <div className="flex flex-row gap-4 w-full">
          <div className="w-full">
            <label className="block text-gray-600 font-medium">Price</label>
            <input 
                    type="number" 
                    name="price" 
                    value={packageData.price} 
                    onChange={handleChange} 
                    min={500}
                    max={15000}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400" placeholder="Enter price" />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div> 
          <div className="w-full">
            <label className="block text-gray-600 font-medium">Total Capacity</label>
            <input type="number" 
                      name="totalCapacity" 
                      value={packageData.totalCapacity} 
                      onChange={handleChange} 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400" 
                      placeholder="Enter Total Capacity"
                      min={1}
                      max={10}
            />
           {errors.totalCapacity && <p className="text-red-500">{errors.price}</p>}
          </div>
         </div>
        <div className="flex flex-row gap-4 w-full m-3">
        <div className="w-full">
          <label className="block text-gray-600 font-medium">Category</label>
          <select name="category" value={packageData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400">
            <option value="">-Select-</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500">{errors.category}</p>}
        </div>
        <div className="w-full">
          <label className="block text-gray-600 font-medium">Duration</label>
          <div className="flex items-center gap-4">
          <label className="block text-gray-600 font-medium">Day</label>
          <input 
                  type="number"
                  name="day" 
                  value={packageData.day} 
                  onChange={handleChange} 
                  className="w-16 px-2 py-1 border rounded-md text-center focus:ring-2 focus:ring-gray-400" placeholder="Days" 
                  min={1}
                  max={15}
          />
          {errors.day && <p className="text-red-500">{errors.day}</p>}
          <label className="block text-gray-600 font-medium">Night</label>
          <input 
                  type="number" 
                  name="night" 
                  value={packageData.night} 
                  onChange={handleChange} 
                  min={0}
                  max={15}
                  className="w-16 px-2 py-1 border rounded-md text-center focus:ring-2 focus:ring-gray-400" placeholder="Nights" />
            {errors.night && <p className="text-red-500">{errors.night}</p>}
          </div>
         </div>
        </div>
 <div className="w-full">
  <label className="block text-gray-700 font-semibold mb-2">Location Coordinates</label>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
   <div>
      <label htmlFor="latitude" className="block text-sm font-medium text-gray-600 mb-1">Latitude (-90 to 90)</label>
      <input
        type="number"
        id="latitude"
        name="latitude"
        value={packageData.coordinates.latitude}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        min={-90}
        max={90}
        step="any"
        placeholder="Enter latitude"
      />
      {errors.coordinates?.latitude && (
        <p className="text-red-500 text-sm mt-1">{errors.coordinates?.latitude}</p>
      )}
    </div>
    <div>
      <label htmlFor="longitude" className="block text-sm font-medium text-gray-600 mb-1">Longitude (-180 to 180)</label>
      <input
        type="number"
        id="longitude"
        name="longitude"
        value={packageData.coordinates.longitude}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        min={-180}
        max={180}
        step="any"
        placeholder="Enter longitude"
      />
      {errors?.coordinates?.longitude && (
        <p className="text-red-500 text-sm mt-1">{errors.coordinates?.longitude}</p>
      )}
    </div>
   </div>
  </div>
  <label className="block text-sm font-medium text-gray-600 mb-1">upload Images</label>
    <div className="flex flex-col items-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-blue-500 transition duration-200 cursor-pointer">
     <label htmlFor="file-upload" className="flex flex-col items-center gap-2 cursor-pointer">
        <svg
          className="w-10 h-10 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V12M7 12V8m0 4h10m-5-6v12" />
        </svg>
        <span className="text-sm font-medium text-gray-600">
          {files.length > 0 ? `${files.length} images selected` : "Click to upload images"}
        </span>
        <span className="text-xs text-gray-400">PNG, JPG, JPEG (Max 5MB each)</span>
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        multiple 
        className="hidden"
        onChange={handleFileChange}
      />
      {errors.images && <p className="text-red-500">{errors.images}</p>}
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {files.map((file, index) => (
            <> 
            <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
             <button
             className="absolute top-1 right-1 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center"
             onClick={() => removeImage(index)}
           >
             ✕
           </button>
           </>
          ))}
         </div>
      )}
    </div>
    <div className=" my-6">
       <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
    </div> 
        <div className="col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Itinerary</h2>
          {packageData.itinerary.map((day, index) => (
            <div key={index} className="p-4 mb-4 border font-bold rounded-lg bg-gray-50">
              <label className="text-gray-900 font-medium text-xl">Day - {day.day}</label>
              <button onClick={() => removeItineraryDay(index)} className="ml-4 px-3 py-1  text-white rounded-lg hover:bg-red-600">
              <Delete size={12} />
              </button>
              <div className="mt-2">
                <label className="block text-gray-700 font-medium">Description</label>
                <input type="text" value={day.description} onChange={(e) => handleItineraryChange(index, "description", e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter description" />
                {errors.itinerary?.[index]?.description && <p className="text-red-400 font-thin">{errors.itinerary?.[index]?.description}</p>}
              </div>
              <div className="mt-2">
                <label className="block text-gray-700 font-medium">Activities</label>
                <textarea value={day.activities} onChange={(e) => handleItineraryChange(index, "activities", e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., City Tour" />
                {errors.itinerary?.[index]?.activities && (
                    <p className="text-red-400 text-thin">{errors.itinerary?.[index]?.activities}</p>
                 )}
              </div>
            <div className="mt-2 flex flex-row gap-4 items-center">
         
     <div className="flex-1">
      <label className="block text-gray-700 font-medium">Stay</label>
      <input 
      type="text" 
      value={day.stay} 
      onChange={(e) => handleItineraryChange(index, "stay", e.target.value)} 
      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
      placeholder="e.g., Hotel Stay" 
    />
   
    {errors.itinerary?.[index]?.stay && (
      <p className="text-red-400 font-thin">{errors.itinerary[index].stay}</p> 
)}
  </div> 
  <div className="flex-1">
    <label className="block text-gray-700 font-medium">Transfer</label>
    <input 
      type="text" 
      value={day.transfer} 
      onChange={(e) => handleItineraryChange(index, "transfer", e.target.value)} 
      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
      placeholder="e.g., Taxi Ride" 
    />
     {errors.itinerary?.[index]?.transfer && (
         <p className="text-red-400 font-thin">{errors.itinerary[index].transfer}</p>
    )}
  </div>
</div>
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
                   {errors.itinerary?.[index]?.meals && <p className="text-red-400 font-thin">{errors.itinerary[index].meals}</p>} 
                 </div>
               </div>
            </div>
          ))}
          <button 
                 type="button" 
                 onClick={addItineraryDay} 
                 disabled={packageData.itinerary.length >= Number(packageData.day)}
                 className="w-32 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                  +Add Day
          </button>
        </div>

        <div className="flex flex-row">
         <div className="col-span-2 justify-center text-center mt-4">
          <button type="submit" className="w-40 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-800">Add Package</button>
         </div>
         <div className="col-span-2 text-center mt-4">
           <button className="w-40 text-gray-700 py-2 rounded-lg"
              onClick={cancelHandleClick}>Cancel</button>
         </div>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
