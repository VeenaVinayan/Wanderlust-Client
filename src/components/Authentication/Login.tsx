import React, { FormEvent, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { LoginFormType, LoginErrorType, FormError } from '../../types/formTypes';
import axiosInstance from '../../apiStore/authApi';
import {toast} from 'react-toastify';
import Modal from '../common/Modal';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../features/authentication/userSlice';
import { setAgentData } from '../../features/authentication/AgentDataSlice';
import Spinner from '../common/Spinner';
import { useGoogleLogin } from '@react-oauth/google';
import googleAuth  from '../../services/Auth/GoogleAuth';
import { LoginResponse } from '../../types/userTypes';

const Login :React.FC = () => {
    const [ formData, setFormData ]  = useState <LoginFormType>({
        email :'',
        password:'',
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [email, setEmail ] = useState<string>('');
    const [formError, setFormError] = useState<LoginErrorType>({});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const userAuthorize = (data : LoginResponse) =>{
      alert('INside user authorize !!');
      const { accessToken, user, address, isVerified } = data;
      console.log('Data valuess in funtion :: ',user,data);
      localStorage.setItem(`${user.role}_accessToken`,accessToken);
      console.log('User Data ::',user);
      switch(user.role){
        case 'Admin':
                    navigate('/admin/adminDashboard');
                    break;
        case 'User':
                     dispatch(setUserData(user));
                     navigate('/');
                     break;
        case 'Agent':
                   // const agent = { ...user, address, ...isVerified};
                    console.log("Verified ::",isVerified,address);
                    dispatch(setAgentData(user));
                    if(isVerified === 'Pending'){
                       navigate('/agent/agentVerification',{state: {status:false}});
                    }else if(isVerified ==='Uploaded'){
                      navigate('/agent/agentVerification',{state :{status:true}});
                    }else{
                      navigate('/agent/agentDashboard');
                    }
                   break;
        default:
                   toast.error('Error occured !!');  
                    break;                                   
      }
    }

    const responseGoogle =  async(authResult) =>{
      try{
            if(authResult["code"]){
                console.log(authResult.code);
                const result = await googleAuth(authResult.code);
                console.log(result.data);
                userAuthorize(result.data);
                toast.success('Successfully Loggddin !');
            }else{
               console.log(authResult);
               throw new Error(authResult);
            }
      }catch(e){
          console.log(e);
      }
  }
    const googleLogin = useGoogleLogin({
         onSuccess: responseGoogle,
         onError: responseGoogle,
         flow: "auth-code",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target;
        setFormData((preData) => ({...preData,[name]:value}));
    }
    const clearFormData = () => {
        setFormData({
           email:'',
           password:'',
      });
    }
    const toggleModal = ()=> setIsModalOpen(!isModalOpen);
  
    const handleSubmit = async (e: React.FormEvent) =>{
         setLoading(true);
         e.preventDefault();
         if(!validation()) return;
         try{
           const response =  await axiosInstance({
                method:'post',
                url:'/login',
                data :{
                   email:formData.email,
                   password:formData.password,
                }
             })
             if(response.data.success) { 
                 toast.success(response?.data?.message);
                 console.log('User Data valuess after response',response.data.data);
                 userAuthorize(response.data.data);
              } 
            }catch(err:any ){
                console.error(err.message);
                clearFormData();
                setLoading(false);
          }
     }
     const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>{
         setEmail(e.target.value);
     }
     const forgetPassword = async (e: FormEvent) =>{
      e.preventDefault(); 
       alert('Forgot password !');
       await axiosInstance.post('/forgotPassword',{email:email})
       .then((response) =>{
           if(response.data.success) {
            toast.success(response.data.message);
            setIsModalOpen(false);
           }else{
            toast.success(response.data.message);
           }
       })
       .catch((err) =>{
         toast.error(err.data.message);
       })
       alert('Forgot password !!');
     }
    const validation = () : boolean => {
          const errors : FormError ={};
        // Validation for Email  
          if(!formData.email.trim()){
             errors.name = 'Email required !'
          }else if(!/\S+@\S+\.\S+/.test(formData.email)){
              errors.name = 'Invalid Email ! '
          }
        // Validation for Password
        if(!formData.password.trim()){
             errors.password = ' Password Required !'
        }else{
          const regEx =/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
          if(!regEx.test(formData.password)){
             errors.password ='Invalid Password '
          }
        } 
        setFormError(errors);
        return Object.keys(errors).length === 0;
    }
    return (
      <>
        <div className="flex flex-col md:flex-row h-screen">
          <div className="w-full md:w-1/2 bg-gray-100 flex flex-col items-center justify-center">
          <img
            src="/images/wanderlust.png"
            alt="Login Illustration"
            className="rounded-md w-2/3 md:w-1/2"
          />
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500
                       3xl">"Fuel Your Soul, Explore the World."</p>
         </div>
          <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
            <div className="w-3/4 md:w-2/3 lg:w-1/2">
              <h2 className="text-2xl font-bold mb-4 text-center text-zinc-700">Login Here !</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-600 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                  {formError.email && <p className='text-red-800 text-thin'>{formError.email}</p>}
                </div>
  
                <div>
                  <label className="block text-gray-600 mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                  {formError.password && <p className='text-red-800 font-thin mb-2'> {formError.password}</p> } 
                </div>
                {isLoading ? ( <Spinner/>   ):
                ( <button
                    type="submit"
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-400"
                   >  Login
                </button>
                )}
              
              </form>
              <div className="flex justify-center items-center py-4">
              <a onClick={toggleModal}
                 className="text-sm md:text-base font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded transition duration-200">
                 Forgot your password? </a>
              </div>

              <Modal 
                 isOpen={isModalOpen}
                 closeModal={toggleModal}
                 title='Reset Your password !'
                >
                 <form onSubmit={forgetPassword}>
                 <label htmlFor="email" className="block mb-2">Email address</label>
                    <input
                        name="email"
                        type="email"
                        required
                        onChange={handleEmail}
                        placeholder="Enter your email"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md" />
                      <button
                        type="submit"
                        className="w-full py-3 bg-gray-600 text-white rounded-md hover:bg-gray-400"
                      >
                        Submit
                   </button>
                 </form>
                </Modal>  
              <div className="mt-4 text-center text-gray-600 gap-2">OR</div>
              <div className="flex justify-center gap-5" >
                  <button onClick={googleLogin} >
                   <img  src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" 
                        alt="Sign in with Google" 
                         className="cursor-pointer"
                    />
                  </button>
                  {/* <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} /> */}
              </div>
             </div>
          </div>
        </div>
      </>
    );
  };
  export default Login;