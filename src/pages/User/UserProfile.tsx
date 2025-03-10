import  React,{ FormEvent, useEffect, useState} from 'react';
import { Mail, Phone } from "lucide-react";
import {  useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store';
import { UserData, TResetPassword } from '../../types/userTypes';
import Modal from '../../components/common/Modal';
import {toast } from 'react-toastify';
import { updateProfile , resetPassword } from '../../services/User/UserProfile';
import { setUserData , resetUserData} from '../../features/authentication/userSlice';
import schema from '../../Validations/UserPasswordReset';
import {  useNavigate } from 'react-router-dom';

const UserProfile : React.FC  = () => {
  const [ user, setUser ] = useState<UserData>();
  const [ isModalOpen , setIsModalOpen] = useState<boolean>(false);
  const [ isPasswordModal, setIsPasswordModal] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const userInfo = useSelector((state : RootState) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ updateUser , setUpdateUser ] = useState({
       name: "",
       phone: "",
 });
 const initialState : TResetPassword= {
     oldPassword:'',
     newPassword:'',
     confirmPassword:'',
 }
 const [password, setPassword ] = useState(initialState);
  useEffect (() =>{
       setUser(userInfo);
       setUpdateUser({name:userInfo.name,phone:userInfo.phone});
  },[userInfo]);

  const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
  } 
  const togglePasswordModal =() =>{ 
      setIsPasswordModal(!isPasswordModal);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
     setUpdateUser((prev) => ({
         ...prev,
        [e.target.name] : e.target.value
     }))
  }
  const passwordHandleChange = ( e: React.ChangeEvent<HTMLInputElement>) =>{
     setPassword((prev) => ({
       ...prev, [e.target.name]:e.target.value
     }))
  }
  const handleSubmit =  async (e : FormEvent) =>{
      e.preventDefault();
     try{
        console.log(" User Id  update profile : ",userInfo.id);
        const response = await updateProfile(updateUser,userInfo.id);
        console.log("REsponse after Edit ::",response.data)
        setIsModalOpen(false);
        if(response){
          dispatch(setUserData(response.data));
          toast.success("Successfully updated !");
        }else{
          toast.error("Error occur while update !");
      }
    }catch(err){
       console.log('Error in update User',err);
       toast.error('Error in update user');
    }
  }
const passwordResetSubmit = async(e: FormEvent) =>{
       e.preventDefault();
       try{
            await schema.validate(password,{abortEarly: false});
            console.log('Form Submitted Successfully !')
            const res = await resetPassword(password,userInfo.id);
            if(res){
               toast.success("Password successfully reset !");
               setErrors({});
               setPassword(initialState);
            }else{
               toast.error("Not successfuly reset password !");
            }
       }catch(err : unknown){
         console.log('Error in ',err);
         if( err instanceof Error && "inner" in err){
            const newErrors: Record<string, string> = {};
            (err as any).inner.forEach((e: any) =>{
                newErrors[e.path as string] = e.message;
            });
            setErrors(newErrors);
         }
       } 
    }
  const handleLogout = async () => {
    try{
        console.log("Logout user !!");
        localStorage.removeItem("User_accessToken");
        dispatch(resetUserData());
        toast.success('Logout Succesfully');
        navigate('/login');
     }catch(err){
       console.error(err);
    }
 }
  return( 
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
     
     <header className="w-full bg-white shadow-md py-4 m-4 rounded-2xl">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold text-blue-600">
        <h1 className=" text-3xl text-center font-bold text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                   Wanderlust
        </h1>
        </div>
        <div 
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition"
            onClick={handleLogout}
        >
        Logout
        </div>
      </nav>
    </header>
    <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-8">
          <div className="mx-auto mb-4">
            <img
              src="/placeholder.svg?height=120&width=120"
              width={120}
              height={120}
              alt="Profile picture"
              className="rounded-full border-4 border-white mx-auto"
            />
          </div>
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-sm text-gray-200">{user?.email}</p>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            
          
            <div className="flex items-center space-x-4 border-b pb-4">
              <Mail className="h-6 w-6 text-gray-500" />
              <div className="w-full">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <p className="mt-1 w-full bg-gray-100 text-gray-700 rounded-md p-2">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 border-b pb-4">
              <Phone className="h-6 w-6 text-gray-500" />
              <div className="w-full">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone</label>
                <p className="mt-1 w-full bg-gray-100 text-gray-700 rounded-md p-2" >{user?.phone}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button className="px-4 py-2 border border-gray-300 bg-blue-600 rounded-lg text-white hover:bg-blue-700" onClick={togglePasswordModal}>
               Reset Password
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={toggleModal}>
              Edit Profile
            </button>
          </div>
          </div>
      </div>
      <Modal
         isOpen= {isModalOpen}
         closeModal={toggleModal}
         title="Edit Profile"
      >
    <form className="space-y-4 bg-white p-6 shadow-lg rounded-lg" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-600">
            Full Name
        </label>
        <input
            type="text"
            name="name"
            value={updateUser.name}
            onChange= {handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
            required
        />
    </div>
    <div>
        <label className="block text-sm font-medium text-gray-600">
            Phone Number
        </label>
        <input
            type="text"
            name="phone"
            value={updateUser.phone}
            onChange={ handleChange }
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your phone number"
            required
        />
    </div>
    <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-600 transition duration-300"
    >
        Update Profile
    </button>
  </form>
 </Modal>

 {/* Reset password Modal */}
 <Modal
        isOpen={isPasswordModal}
        closeModal={togglePasswordModal}
        title={"Reset Password"} >
    <div>
     <form className="space-y-4" onSubmit={passwordResetSubmit}>
       <div>
        <label className="block text-sm font-medium text-gray-700">Old Password</label>
        <input
          type="password"
          className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-gray-200"
          placeholder="Enter old password"
          name="oldPassword"
          onChange={passwordHandleChange}
        />
          {errors.oldPassword && <p className="text-red-500">{errors.oldPassword}</p>}
      </div>
    
      <div>
        <label className="block text-sm font-medium text-gray-700">New Password</label>
        <input
          type="password"
          className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-gray-200"
          placeholder="Enter new password"
          name="newPassword"
          onChange={passwordHandleChange}
        />
          {errors.newPassword && <p className="text-red-500">{errors.newPassword}</p>}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-gray-200"
          placeholder="Confirm new password"
          name="confirmPassword"
          onChange={passwordHandleChange}
        />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
      >
        Reset Password
      </button>
    </form>
  </div>
 </Modal>
</div>
)
}
// return (
//   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    {/* Header */}
    

//     {/* Profile Card */}
//     <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl overflow-hidden mt-8">
//       <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-8">
//         <div className="mx-auto mb-4">
//           <img
//             src="/placeholder.svg?height=120&width=120"
//             width={120}
//             height={120}
//             alt="Profile picture"
//             className="rounded-full border-4 border-white mx-auto"
//           />
//         </div>
//         <h2 className="text-2xl font-bold">{user?.name}</h2>
//         <p className="text-sm text-gray-200">{user?.email}</p>
//       </div>

//       {/* User Info Section */}
//       <div className="p-6">
//         <div className="space-y-6">
//           <div className="flex items-center space-x-4 border-b pb-4">
//             <Mail className="h-6 w-6 text-gray-500" />
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-600">Email</label>
//               <p className="mt-1 w-full bg-gray-100 text-gray-700 rounded-md p-2">{user?.email}</p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4 border-b pb-4">
//             <Phone className="h-6 w-6 text-gray-500" />
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-600">Phone</label>
//               <p className="mt-1 w-full bg-gray-100 text-gray-700 rounded-md p-2">{user?.phone}</p>
//             </div>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between mt-6">
//           <button
//             className="px-4 py-2 border border-gray-300 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
//             onClick={togglePasswordModal}
//           >
//             Reset Password
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             onClick={toggleModal}
//           >
//             Edit Profile
//           </button>
//         </div>
//       </div>
//     </div>

//     {/* Edit Profile Modal */}
//     <Modal isOpen={isModalOpen} closeModal={toggleModal} title="Edit Profile">
//       <form className="space-y-4 bg-white p-6 shadow-lg rounded-lg" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text-sm font-medium text-gray-600">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={updateUser.name}
//             onChange={handleChange}
//             className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter your name"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-600">Phone Number</label>
//           <input
//             type="text"
//             name="phone"
//             value={updateUser.phone}
//             onChange={handleChange}
//             className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter your phone number"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-600 transition duration-300"
//         >
//           Update Profile
//         </button>
//       </form>
//     </Modal>

//     {/* Reset Password Modal */}
//     <Modal isOpen={isPasswordModal} closeModal={togglePasswordModal} title="Reset Password">
//       <form className="space-y-4" onSubmit={passwordResetSubmit}>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Old Password</label>
//           <input
//             type="password"
//             name="oldPassword"
//             className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-gray-200"
//             placeholder="Enter old password"
//             onChange={passwordHandleChange}
//           />
//           {errors.oldPassword && <p className="text-red-500">{errors.oldPassword}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">New Password</label>
//           <input
//             type="password"
//             name="newPassword"
//             className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-gray-200"
//             placeholder="Enter new password"
//             onChange={passwordHandleChange}
//           />
//           {errors.newPassword && <p className="text-red-500">{errors.newPassword}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-gray-200"
//             placeholder="Confirm new password"
//             onChange={passwordHandleChange}
//           />
//           {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
//         </div>
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
//           Reset Password
//         </button>
//       </form>
//     </Modal>
//   </div>
// );

export default UserProfile;


