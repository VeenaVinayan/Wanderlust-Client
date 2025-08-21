import { useState, useEffect } from "react";
import { useLocation, useNavigate , Link} from "react-router-dom";
import { TItinerary , TPackage} from "../../types/packageTypes";
import { DeleteIcon } from "lucide-react";
import { toast } from "react-toastify";
import { editPackage } from "../../services/Agent/PackageService";
import { getCategories } from "../../services/Agent/PackageService";
import { TCategoryValue } from "../../types/agentTypes";
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import schema from '../../Validations/EditPackage';
import { ValidationError } from 'yup';
import { PackageFormError , ItineraryItemError} from '../../types/errorTypes';
import { EditPackageInitialState } from "../../Constants/InitialState";

const EditPackage = () => {
  const [packageData, setPackageData] = useState<TPackage>();
  const [expandedDays, setExpandedDays] = useState<{ [key: number]: boolean }>({});
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [deleteImage, setDeleteImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ categories, setCategories ] = useState<TCategoryValue[]>([])
  const [ selectedCategory, setSelectedCategory ] = useState<TCategoryValue>();
  const location = useLocation();
  const packages = location.state;
  const navigate = useNavigate();
  const agentData = useSelector((state:RootState) => state.agentSliceData);
  const [ errors, setErrors ] = useState<PackageFormError>({});

  useEffect(() => {
    if (packages) {
      const fetchCategories = async () =>{
          const response = await getCategories();
          if(response){
              setCategories(response);
          }
      }
      setSelectedCategory(selectCategory())
      console.log(selectedCategory)
      setPackageData(packages);
      setExistingImages(packages.images || []);
      fetchCategories();
    }
  },[]);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  e.preventDefault();
  if (!packageData) return;

  const { name, value } = e.target;
  console.log("Value is ::", value);

  if (["longitude", "latitude"].includes(name)) {
    setPackageData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [name]: value,
        },
      };
    });
  } else {
    setPackageData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value,
      };
    });
  }
};

  const selectCategory = () : TCategoryValue =>{
    const selected = categories.find(category => category._id === packageData!.category);
    console.log(" Selected :",selected);
    return selected!;
  }
  const handleItineraryChange = (index: number, field: string, value: string | string[]) => {
    if (!packageData) return;
    const updatedItinerary = [...packageData.itinerary];
    updatedItinerary[index] = { ...updatedItinerary[index], [field]: value };
    setPackageData({ ...packageData, itinerary: updatedItinerary });
  };

  const toggleDay = (index: number) => {
    setExpandedDays((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const removeItineraryDay = (index: number) => {
    if (!packageData) return;
    const updatedItinerary = packageData.itinerary.filter((_, i) => i !== index);
    setPackageData({ ...packageData, itinerary: updatedItinerary });
  };

  const addItineraryDay = () => {
    if (!packageData) return;
    const newItinerary: TItinerary = { day: 1,description: "", activities: "", meals: [], stay: "", transfer: "" };
    setPackageData({ ...packageData, itinerary: [...packageData.itinerary, newItinerary] });
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
      e.target.value = ""; 
    }
  };
  const removeNewImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  const removeExistingImage = (imageUrl: string) => {
      setExistingImages(existingImages.filter((img) => img !== imageUrl));
      setDeleteImages([...deleteImage, imageUrl]);
  };
 const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    console.log('Edit package ::',packageData);
    setIsSubmitting(true);
    try {
      
      packageData!.images = existingImages;
      packageData!.agent = agentData.id;
      await schema.validate(packageData,{ abortEarly:false})
      if(existingImages.length === 0 && images.length ===0 ){
          toast.error('Add atleat one Image');
          return;
      }
      console.log("After Edit values Are :: ",packageData,packageData!.category);
      const response = await editPackage(packageData!,images,deleteImage);
      console.log("REsponse ::",response)
      if (response) {
        toast.success("Package updated successfully!");
        setPackageData(EditPackageInitialState);
        navigate('/agent/agentDashboard/package');
      }
   }catch(err: unknown){
     if (err instanceof ValidationError) {
     console.log("Errors ",err); 
     const formattedErrors: PackageFormError = {};
        err.inner.forEach((error) => {
        const path = error.path || "";
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
          console.log("Errors are ::",formattedErrors);
          setErrors(formattedErrors);
        }
    }finally {
      setIsSubmitting(false);
    }
  };
 if(!packageData) {
    return <p className="text-center text-gray-600">Package not found.</p>;
 }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Package</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="name"
              value={packageData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Title"
            />
             {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={packageData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Description"
              rows={4}
            />
            {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={packageData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Price"
            />
         {errors.price && <p className="text-red-500">{errors.price}</p>}   
        </div>
    <div>
     <label className="block text-gray-600 font-medium">Category</label>
     <select
       name="category"
       value={packageData.category}  
       onChange={handleChange}
       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-300"
     >
    {categories
      .map(category => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
      ))}
    </select>
     {errors.category && <p className="text-red-500">{errors.category}</p>}
   </div>
   </div>
   <div className="grid grid-cols-2 gap-4">
    <div>
     <label className="block text-sm font-medium text-gray-700">Total Capacity</label>
       <input 
            type="number"
            name="totalCapacity"
            className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 fous:ring-gray-300"
            value={packageData.totalCapacity}
            onChange={handleChange}
            placeholder="Total Capacity"
        />    
        {errors.totalCapacity && <p className="text-red-500">{errors.totalCapacity}</p>}
    </div>
    <div>
       <label className="block text-sm font-small text-gray-700">Discount</label>
       <input
              type="number"
              name="discount"
              value={packageData.discount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Discount"
       />
    </div>
   </div>
     <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Day</label>
              <input
                type="text"
                name="day"
                value={packageData.day || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Day"
              />
                {errors.day && <p className="text-red-500">{errors.day}</p>}
              </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Night</label>
              <input
                type="text"
                name="night"
                value={packageData.night || 0}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Night"
              />
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
        step="any"
        value={packageData?.coordinates?.latitude || 0}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        min={-90}
        max={90}
        placeholder="Enter latitude"
      />
      {errors.latitude && (
        <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>
      )}
    </div>
    <div>
      <label htmlFor="longitude" className="block text-sm font-medium text-gray-600 mb-1">Longitude (-180 to 180)</label>
      <input
        type="number"
        id="longitude"
        step="any"
        name="longitude"
        value={packageData?.coordinates?.longitude || 0}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        min={-180}
        max={180}
        placeholder="Enter longitude"
      />
      {errors.longitude && (
        <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>
      )}
    </div>
   </div>
  </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Images</h3>
            <div className="flex flex-wrap gap-2">
            {existingImages.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <img src={img} alt="Uploaded" className="w-full h-full object-cover rounded-md" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                  onClick={() => removeExistingImage(img)}
                >
                  <DeleteIcon size={16} />
                </button>
              </div>
            ))}
          </div>
  
<label className="block text-sm font-medium text-gray-700">Upload New Images</label>
<div className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition duration-300">
  <input
    type="file"
    multiple
    accept="image/*"
    id="file-upload"
    className="hidden"
    onChange={handleImageUpload}
  />
  <label
    htmlFor="file-upload"
    className="flex flex-col items-center space-y-2 cursor-pointer"
  >
    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
      📷
    </div>
    <label className="mt-2 px-2 py-1 text-white bg-gray-700 rounded-lg shadow hover:bg-gray-900 transition">
      Select Files
    </label>
  </label>
 </div>
        <div className="flex flex-wrap gap-2">
            {images.map((file, index) => (
              <div key={index} className="relative w-24 h-24">
                <img src={URL.createObjectURL(file)} alt="New Upload" className="w-4/6 h-full object-cover rounded-md" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                  onClick={() => removeNewImage(index)}
                >
                  <DeleteIcon size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Itinerary</h3>
          {(packageData.itinerary as {
               description: string;
               activities: string;
               meals: string[];
               stay: string;
               transfer: string;
          }[]).map((day, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => toggleDay(index)}
                  className="w-full flex justify-between items-center text-left font-semibold text-gray-700 hover:text-blue-600 transition"
                >
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-lg">Day {index + 1}</span>
                  <span>{expandedDays[index] ? "▲" : "▼"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => removeItineraryDay(index)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <DeleteIcon size={20} />
                </button>
              </div>
             {expandedDays[index] && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Day Description</label>
                    <input
                      type="text"
                      value={day.description}
                      onChange={(e) => handleItineraryChange(index, "description", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Day Description"
                    />
                     {errors.itinerary?.[index]?.description && <p className="text-red-500">{errors.itinerary[index]?.description}</p>}
                  </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Activities</label>
                    <textarea
                      value={day.activities || ""}
                      onChange={(e) => handleItineraryChange(index, "activities", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Activities for the day"
                      rows={3}
                    />
                  {errors.itinerary?.[index]?.activities && (
                    <p className="text-red-500">{errors.itinerary[index]?.activities}</p>
                 )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Meals</label>
                    <div className="grid grid-cols-2 gap-2">
                      {
                        ["Breakfast", "Lunch", "Snacks", "Dinner"].map((meal) => (
                        <label key={meal} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={day.meals.includes(meal)}
                            onChange={(e) => {
                              const updatedMeals = e.target.checked
                                ? [...day.meals || [], meal]
                                : day.meals.filter((m) => m !== meal);
                              handleItineraryChange(index, "meals", updatedMeals);
                            }}
                            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-gray-600">{meal}</span>
                        </label>
                      ))}
                 {errors.itinerary?.[index-1]?.meals && <p className="text-red-500">{errors.itinerary[index]?.meals}</p>} 
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stay</label>
                    <input
                      type="text"
                      value={day.stay || ""}
                      onChange={(e) => handleItineraryChange(index, "stay", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Stay details"
                    />
                     {errors.itinerary?.[index-1]?.stay && (
                        <p className="text-red-500">{errors.itinerary[index]?.stay}</p>
                     )}
                      {errors.itinerary?.[index]?.transfer && (
                          <p className="text-red-500">{errors.itinerary[index]?.transfer}</p>
                      )}
                    <label className="block text-sm font-medium text-gray-700">Transfer</label>
                    <input
                      type="text"
                      value={day.transfer || ""}
                      onChange={(e) => handleItineraryChange(index, "transfer", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Transfer details"
                    />
                      {errors.itinerary?.[index-1]?.transfer && (
                          <p className="text-red-500">{errors.itinerary[index]?.transfer}</p>
                      )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addItineraryDay}
            className="w-36 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            + Add Itinerary Day
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-1/2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          {isSubmitting ? "Updating..." : "Update Package"}
        </button>
        <div>
           <Link to="/agent/agentDashboard/package">Cancel</Link>  
        </div>
      </form>
    </div>
  );
};

export default EditPackage;