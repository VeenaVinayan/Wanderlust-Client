import React, { useState } from 'react';
import { User,Mail,Key, Smartphone,House,LandPlot,Landmark,Code} from 'lucide-react';
//import AgentValidation from '../../Validations/AgentRegister';
import { AgentFormDataType } from '../../types/formTypes';
import axiosInstance from '../../apiStore/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setAgentRegistrationData } from '../../features/authentication/AgentSlice';
const AgentRegister :React.FC = () => {
  const [formData, setFormData] = useState <AgentFormDataType>({
       name:'',
       email:'',
       phone:'',
       password:'',
       conPassword:'',
       address:{
           home:'',
           street:'',
           city:'',
           state:'',
           country:'',
           zipcode:'',
       },
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    
    try{
         const response = await axiosInstance({
                 method:'post',
                 url:'/register',
                 data:{
                    email:formData.email,
                 }
                });
                if(response.status === 200){
                   const user : string= 'Agent';
                   dispatch(setAgentRegistrationData(formData));
                   toast.success('Successfully completed registration !');
                   navigate(`/otp/${user}`);
                }
    }catch(err){
      console.error(err)
    }
  // try{
  //    await AgentValidation.validate(formData, {abortEarly :false});
  // }catch(error: any){
  //     console.log(error);
  //     const formattedErrors: {[key: string]:string} = {};
  //     error.inner.forEach((err: any) =>{
  //        formattedErrors[err.path] = err.message;
  //     });
  //     setFormErrors(formattedErrors);
  // }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      const { name,value } = e.target;
      // if(e.target.files && e.target.files.length > 0){
      //   const file = e.target.files?.[0]
      //    setFormData((prevData) => ({...prevData,[name]:file}));
      //    setPreview(URL.createObjectURL(file))
      //    setImage(true);
      // }else{
        setFormData((prevData) => ({...prevData, [name]:value}));
      
  } ;

 return (
  <div className="p-6 max-w-xl m-4 bg-white rounded-xl shadow-md space-y-6 items-center mx-auto gap-4">
  <h2 className="text-2xl font-bold text-center text-gray-600">Agent Registration</h2>
  <p className="text-red-500 text-center hidden">Error Message</p>
  <form onSubmit={handleSubmit}>
  <div className="space-y-4 gap-2">
    <div className="flex items-center border rounded p-2 gap-2">
        <User color='gray' size={24} />
        <input type="text" placeholder="Full Name" className="w-full outline-none" onChange={handleChange} name="name" required/>
        {/* {errors.name && <p className="text-red-500">{errors.name}</p>}  */}
    </div>
    <div className="flex items-center border rounded p-2 gap-2">
      <Mail color='gray' size={20} />
      <input type="email" placeholder="Email" className="w-full outline-none " onChange={handleChange} name="email" required />
      {/* {errors.email && <p className="text-red-500">{errors.email}</p>} */}
    </div>
    <div className="flex items-center border rounded p-2 gap-2">
      <Key color='gray' size={20} />
      <input type="password" name="password"
              placeholder="Password" 
              className="w-full outline-none"
              onChange={handleChange} required />
      </div>
    {/* {errors.password && <p className="text-red-500">{errors.password}</p>} */}
    <div className="flex items-center border rounded p-2 gap-2">
      <Key color='gray' size={20} />
      <input type="password" placeholder="Confirm Password" className="w-full outline-none" name="conPassword" onChange={handleChange} required/>
    </div>
    {/* {errors.conPassword && <p className="text-red-500">{errors.conPassword}</p>} */}
    <div className="flex items-center border rounded p-2 gap-2">
      <Smartphone color='gray' size={20} />
      <input type="text" name="phone" placeholder="Phone Number" className="w-full outline-none" onChange={handleChange} required />
    </div>
    {/* {errors.phone && <p className="text-red-500">{errors.phone}</p>} */}
  </div>

  <div className="space-y-4 border rounded-sm shadow-lg mx-auto p-3">
    <h3 className="text-lg font-semibold text-gray">Address</h3>
    <div className='flex items-center flex-row gap-2'>
      <div className="flex items-center border rounded p-2 gap-2">
           <House color='gray' size={20} />
           <input type="text" placeholder="House Name" name="house" className="w-30 h-4 outline-none" onChange={handleChange} required />
      </div>
      {/* {errors.home && <p className="text-red-500">{errors.home}</p>} */}
      <div className="flex items-center border rounded p-2 gap-2">
          <Landmark color='gray' size={20} />
          <input type="text" placeholder="Street" className="w-30 h-4 outline-none" onChange={handleChange} name="street" required />
       </div>
      {/* {errors.street && <p className="text-red-500">{errors.street}</p>} */}
    </div>
    <div className='flex items-center flex-row gap-2'>
      <div className="flex items-center border rounded p-2 gap-2">
           <Landmark color='gray' size={20} />
           <input type="text" placeholder="City" className="w-30 h-4 outline-none" onChange={handleChange} name="city" required />
           {/* {errors.city && <p className="text-red-500">{errors.city}</p>} */}
      </div>
      <div className="flex items-center border rounded p-2 gap-2">
          <Landmark color='gray' size={20} />
          <input type="text" placeholder="State" className="w-30 h-4 outline-none" onChange={handleChange} name="state" required />
          {/* {errors.state && <p className="text-red-500">{errors.state}</p>} */}
      </div>
    </div>
    <div className='flex items-center flex-row gap-2'>
      <div className="flex items-center border rounded p-2 gap-2">
           <LandPlot color='gray' size={20} />
           <input type="text" placeholder="Country" className="w-30 h-4 outline-none" onChange={handleChange} name="country"  required/>
           {/* {errors.country && <p className="text-red-500">{errors.country}</p>} */}
      </div>
      <div className="flex items-center border rounded p-2 gap-2">
          <Code color='gray' size={20} />
          <input type="text" placeholder="Zip Code" className=" outline-none w-30 h-4" onChange={handleChange} name="zipcode" required />
          {/* {errors.zipcode && <p className="text-red-500">{errors.zipcode}</p>} */}
      </div>
    </div>
  </div>
   {/* { !isImage ? (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition duration-300 m-2">
     <label  className="cursor-pointer flex flex-col items-center justify-center space-y-3">
      <Image color='gray' size={20} />
       <span className="text-gray-600 font-medium text-lg">Click to Upload  Your Travel Certificate ! </span>
       <input id="file-upload" type="file" className="hidden" onChange={handleChange} />
     </label>
    </div> 
    ):(
      <div className='gap-4 mx-auto'>
         <p className="mb-2 text-gray-600 ">Selected Image:</p>
          <img src={preview}  alt="Selected Preview" className="w-64 h-64 object-cover rounded-lg shadow-lg"  />
      </div>
     )
     } */}
    <button type="submit"
        className="w-full bg-gray-700 text-white rounded p-2 hover:bg-gray-700 shadow-md transition">
        Register
    </button>
   </form>
 
</div>
 )
}

export default AgentRegister;
