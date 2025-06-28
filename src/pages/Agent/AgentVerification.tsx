import { FormEvent, useState } from "react";
import { ImagePlus } from "lucide-react";
import Header from '../../components/layout/Shared/Header';
import { toast } from 'react-toastify';
import { uploadCertificate  } from "../../services/Agent/AgentService";
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import { Loader2} from 'lucide-react';
import { useLocation } from "react-router-dom";

const  LicenseUpload : React.FC = () => {
  const location = useLocation();
  const data = location.state; 
  console.log('Agent Verification ::',data);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const agentData = useSelector((state: RootState) => state.agentSliceData);
  const [isUpload, setIsUpload ] = useState<boolean>(data.status);
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
    if (fileSizeInMB > 2) {
      toast.error("Image size exceeds 2 MB");
      return;
    }
    console.log("Image size:", fileSizeInMB.toFixed(2), "MB");
     setFile(file);
     setImagePreview(URL.createObjectURL(file));
  }
};

  const handleSubmit =  async(e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const res = await uploadCertificate(agentData.id,file);
    if(res){
      toast.success('Successfully uploaded Certificate !!');
      setIsUpload(true);
    }else{
       toast.error('Failed to upload certificate ')
    }
   };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center   bg-gray-50 text-gray-100">
      <Header />
      { !isUpload ? ( 
      <div className="bg-gray-100 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-400 mb-2">
           Upload License for Verification
        </h2>
         <p className="text-gray-400 mb-6">Submit your valid license for verification.</p>
   
         <form className="border border-gray-700 rounded-lg p-6 bg-gray-900" onSubmit={handleSubmit}>
          <label className="block text-gray-400 font-medium mb-2">Upload License</label>
          
          <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-blue-400">
            <input 
              type="file" 
              className="hidden" 
              accept=".jpg,.jpeg,.png,.pdf" 
              onChange={handleImageChange} 
            />
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-30 w-30 rounded-lg object-cover shadow-md" 
              />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <ImagePlus className="w-10 h-10" />
                <span className="text-sm mt-2">Click to upload</span>
              </div>
            )}
          </label>
          {file && (
            <p className="mt-3 text-sm text-gray-300">Selected: {file.name}</p>
          )}
        <button type='submit'
            className="w-full mt-5 bg-gray-500 hover:bg-gray-800 text-white py-2 rounded-lg font-medium transition duration-300"
        >
          Upload Certificate
        </button>
      </form>
     </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Waiting for Admin Approval</h2>
          <p className="text-gray-600 mt-2">Your request is under review. Please wait for approval.</p>
          <p className="mt-4 text-blue-500 font-medium">Thank you for your patience!</p>
        </div>
      </div>
      )}
    </div>
  );
}

export default LicenseUpload;