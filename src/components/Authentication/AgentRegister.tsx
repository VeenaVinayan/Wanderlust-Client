import React, { useState } from 'react';
import { User,Mail,Key, Smartphone,House,LandPlot,Landmark,Code} from 'lucide-react';
import AgentValidation from '../../Validations/AgentRegister';
import { AgentFormDataType } from '../../types/formTypes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/Auth/Auth';
import { setAgentRegistrationData } from '../../features/authentication/AgentSlice';
import { ValidationError } from 'yup';

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
  });
  const[ errors, setErrors ] = useState<Record<string, string>>({
    name: '',
    email: '',
    phone: '',
    password: '',
    conPassword: '',
    home: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipcode: ''
  }); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try{
         console.log('Agent Registration Response : ', formData);
         await AgentValidation.validate(formData, {abortEarly :false});
         const response = await registerUser(formData.email);
         if(response.success){
            const user : string= 'Agent';
            dispatch(setAgentRegistrationData(formData));
            toast.success('Successfully completed registration !');
            navigate(`/otp/${user}`);
          }
    }catch(err : unknown){
      if(err instanceof ValidationError){
         const newErrors : Record<string, string> = {};
         err.inner.forEach((e) => {
            if(e.path){
               newErrors[e.path] = e.message;
            }
         });
          setErrors(newErrors);
      }else if(err instanceof Error){
         console.error('Error in Agent Registration !!', err.message);
         toast.error(err.message || 'Registration failed. Please try again.');
      }
    
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      const { name,value } = e.target;
      setFormData((prevData) => ({...prevData, [name]:value}));
  } ;

 return (
  <div className="p-6 max-w-xl m-4 bg-white rounded-xl shadow-md space-y-6 items-center mx-auto gap-4">
  <h2 className="text-2xl font-bold text-center text-gray-600">Agent Registration</h2>
  <p className="text-red-500 text-center hidden">Error Message</p>
  <form onSubmit={handleSubmit}>
  <div className="space-y-4 gap-2">
    <div className='flex flex-col p-1 gap-2'>
     <div className="flex items-center border rounded=== p-2 gap-2">
        <User color='gray' size={24} />
        <input type="text" placeholder="Full Name" className="w-full outline-none" onChange={handleChange} name="name" />
     </div>
     {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>} 
     </div>
    <div className="flex items-center border rounded p-2 gap-2">
      <Mail color='gray' size={20} />
      <input type="email" placeholder="Email" className="w-full outline-none " onChange={handleChange} name="email"  />
       
    </div>
    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>} 
    <div className="flex items-center border rounded p-2 gap-2">
      <Key color='gray' size={20} />
      <input type="password" name="password"
              placeholder="Password" 
              className="w-full outline-none"
              onChange={handleChange}  />
      </div>
       {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>} 
    <div className="flex items-center border rounded p-2 gap-2">
      <Key color='gray' size={20} />
      <input type="password" placeholder="Confirm Password" className="w-full outline-none" name="conPassword" onChange={handleChange} />
    </div>
     {errors.conPassword && <p className="text-red-500 text-xs">{errors.conPassword}</p>} 
    <div className="flex items-center border rounded p-2 gap-2">
      <Smartphone color='gray' size={20} />
      <input type="text" name="phone" placeholder="Phone Number" className="w-full outline-none" onChange={handleChange}  />
    </div>
       {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>} 
  </div>

  <div className="space-y-4 border rounded-sm shadow-lg mx-auto p-3">
    <h3 className="text-lg font-semibold text-gray">Address</h3>
    <div className='flex items-center flex-row gap-2'>
     <div>
      <div className="flex items-center border rounded p-2 gap-2">
           <House color='gray' size={20} />
           <input type="text" placeholder="House Name" name="home" className="w-30 h-4 outline-none" onChange={handleChange}  />
      </div>
        {errors.home && <p className="text-red-500 text-xs">{errors.home}</p>} 
       </div> 
      <div> 
      <div className="flex items-center border rounded p-2 gap-2">
          <Landmark color='gray' size={20} />
          <input type="text" placeholder="Street" className="w-30 h-4 outline-none" onChange={handleChange} name="street"  />
       </div>
        {errors.street && <p className="text-red-500 text-xs">{errors.street}</p>} 
       </div>  
    </div>
    <div className='flex items-center flex-row gap-2'>
      <div>
        <div className="flex items-center border rounded p-2 gap-2">
           <Landmark color='gray' size={20} />
           <input type="text" placeholder="City" className="w-30 h-4 outline-none" onChange={handleChange} name="city" />
        </div>
         {errors.city && <p className="text-red-500 text-xs">{ errors.city}</p>} 
      </div>
      <div>
      <div className="flex items-center border rounded p-2 gap-2">
          <Landmark color='gray' size={20} />
          <input type="text" placeholder="State" className="w-30 h-4 outline-none" onChange={handleChange} name="state"  />
       </div>
       {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>} 
       </div>
    </div>
    <div className='flex items-center flex-row gap-2'>
      <div>
       <div className="flex items-center border rounded p-2 gap-2">
           <LandPlot color='gray' size={20} />
           <input type="text" placeholder="Country" className="w-30 h-4 outline-none" onChange={handleChange} name="country"  />
        </div>
        {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>} 
       </div> 
       <div>
        <div className="flex items-center border rounded p-2 gap-2">
          <Code color='gray' size={20} />
          <input type="text" placeholder="Zip Code" className=" outline-none w-30 h-4" onChange={handleChange} name="zipcode"  />
        </div>
          {errors.zipcode && <p className="text-red-500 text-xs">{errors.zipcode}</p>}
       </div>    
    </div>
  </div>
   
    <button type="submit"
        className="w-full bg-gray-700 text-white rounded p-2 hover:bg-gray-700 shadow-md transition">
        Register
    </button>
   </form>
 
</div>
 )
}

export default AgentRegister;
