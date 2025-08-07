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
<div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-6">
  <h2 className="text-2xl font-bold text-center text-gray-700">Agent Registration</h2>

  {/* Global error message (optional) */}
  <p className="text-red-500 text-center hidden">Error Message</p>

  <form onSubmit={handleSubmit} className="space-y-5">
    {/* Name */}
    <div>
      <div className="flex items-center border rounded p-2 gap-2">
        <User color="gray" size={24} />
        <input
          type="text"
          placeholder="Full Name"
          className="w-full outline-none"
          onChange={handleChange}
          name="name"
        />
      </div>
      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
    </div>

    {/* Email */}
    <div>
      <div className="flex items-center border rounded p-2 gap-2">
        <Mail color="gray" size={20} />
        <input
          type="email"
          placeholder="Email"
          className="w-full outline-none"
          onChange={handleChange}
          name="email"
        />
      </div>
      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
    </div>

    {/* Password */}
    <div>
      <div className="flex items-center border rounded p-2 gap-2">
        <Key color="gray" size={20} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full outline-none"
          onChange={handleChange}
        />
      </div>
      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
    </div>

    {/* Confirm Password */}
    <div>
      <div className="flex items-center border rounded p-2 gap-2">
        <Key color="gray" size={20} />
        <input
          type="password"
          placeholder="Confirm Password"
          name="conPassword"
          className="w-full outline-none"
          onChange={handleChange}
        />
      </div>
      {errors.conPassword && <p className="text-red-500 text-xs mt-1">{errors.conPassword}</p>}
    </div>

    {/* Phone Number */}
    <div>
      <div className="flex items-center border rounded p-2 gap-2">
        <Smartphone color="gray" size={20} />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full outline-none"
          onChange={handleChange}
        />
      </div>
      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
    </div>

    {/* Address Section */}
    <div className="border rounded shadow p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Address</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center border rounded p-2 gap-2">
            <House color="gray" size={20} />
            <input
              type="text"
              placeholder="House Name"
              name="home"
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>
          {errors.home && <p className="text-red-500 text-xs mt-1">{errors.home}</p>}
        </div>

        <div>
          <div className="flex items-center border rounded p-2 gap-2">
            <Landmark color="gray" size={20} />
            <input
              type="text"
              placeholder="Street"
              name="street"
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>
          {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
        </div>

        <div>
          <div className="flex items-center border rounded p-2 gap-2">
            <Landmark color="gray" size={20} />
            <input
              type="text"
              placeholder="City"
              name="city"
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>

        <div>
          <div className="flex items-center border rounded p-2 gap-2">
            <Landmark color="gray" size={20} />
            <input
              type="text"
              placeholder="State"
              name="state"
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
        </div>

        <div>
          <div className="flex items-center border rounded p-2 gap-2">
            <LandPlot color="gray" size={20} />
            <input
              type="text"
              placeholder="Country"
              name="country"
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
        </div>

        <div>
          <div className="flex items-center border rounded p-2 gap-2">
            <Code color="gray" size={20} />
            <input
              type="text"
              placeholder="Zip Code"
              name="zipcode"
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>
          {errors.zipcode && <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>}
        </div>
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-gray-700 text-white rounded p-2 hover:bg-gray-800 transition-all shadow"
    >
      Register
    </button>
  </form>
</div>

 )
}

export default AgentRegister;
