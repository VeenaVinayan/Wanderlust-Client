import React, { useState } from 'react';
import axiosInstance from '../../apiStore/authApi';
import {  FormDataType , FormError } from '../../types/formTypes';
import { useNavigate } from 'react-router-dom';
import { useDispatch  } from 'react-redux';
import { setRegistrationData } from '../../features/authentication/registerSlice';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState <FormDataType>({
    name: '',
    email: '',
    phone:'',
    password: '',
    conPassword: '',
  });
 const [formErrors, setFormErrors]  = useState <FormError>({});
 const [successMessage,setSuccessMessage] = useState <string | null>(null);
 const [errorMessage,setErrorMessage] = useState <string | null>(null);
 const dispatch =  useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit  = async  (e: React.FormEvent) => {
    e.preventDefault();
    if(!validateForm()) return;
     try{
         //const response = await axiosInstance.post('/auth/register',formData);
         const response = await axiosInstance({
            method:'post',
            url:'/register',
            data:{
               email:formData.email,
            }
         })
         setSuccessMessage(response.data.message ||  'Registration Successful !');
         setErrorMessage(null);
         dispatch(setRegistrationData(formData));  
         setFormData({
           name:'',
           email:'',
           phone:'',
           password:'',
           conPassword:'',
         })
         const user:string = 'User';
         navigate(`/otp/${user}`);
     }catch(err :any){
        setErrorMessage(err.response?.data?.message || 'Something went Wrong !');
        setSuccessMessage(null);
     }
   };
  const validateForm = () :boolean  =>{
       const errors: FormError = {};
 // Validations for Name      
       if(!formData.name.trim()){
           errors.name = 'Name required !'
       }else if(formData.name.length <3){
          errors.name = 'Name must be atlest 3 characters !'
       }else if(!/^[A-Za-z\s]+$/.test(formData.name)){
          errors.name = 'Name must be more than 3 characters !!';
       }
// Validations for Email
       if(!formData.email){
          errors.email = " Email is required !!";
       }else if(! /\S+@\S+\.\S+/.test(formData.email)){
          errors.email = 'Email is invalid !';
       }
 // Validations for phone
      if(!formData.phone){
         errors.phone = 'Phone Number is required !';
      }else if(!/^\d{10}$/.test(formData.phone)){
          errors.phone='Phone number must be 10 digits !';
      }   
  // Password confirmation
  if(!formData.password){
      errors.password = 'Password is Required !';
  }
  if(!formData.conPassword){
     errors.conPassword = 'COnfirm password Required !';
   }
  if(formData.password !== formData.conPassword){
      errors.password = "Passwords Do Not Match !";
  }else{
     const regEx =/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
     if(!regEx.test(formData.password)){
       errors.password = " Password Not strong ";
    }
  }   
  setFormErrors(errors);
  return Object.keys(errors).length === 0;    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {successMessage && <p className='text-green-500 mb-4'>{successMessage}</p>}
        {errorMessage && <p className='text-red-500 mb-4'>{errorMessage}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
             />
            {formErrors.name && <p className='text-red-500'>{formErrors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {formErrors.email && <p className='text-red-500'> {formErrors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="string"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Phone number"
             />
            {formErrors.phone && <p className='text-red-500'>{formErrors.phone}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
           />
            {formErrors.password && <p className='text-red-400'>{formErrors.password}</p> }
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="conPassword"
              value={formData.conPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
            {formErrors.conPassword && <p className='text-red-400'> {formErrors.conPassword}</p>} 
          </div>
          <button
            type="submit"
            className="w-full bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
        <p className="text-sm text-center text-gray-600 mt-4">
          <a href="/agentRegister" className="text-gray-400 hover:underline">
             Be a partner ?{' '}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
