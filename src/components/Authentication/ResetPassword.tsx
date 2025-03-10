import React, { useState } from "react";
import axiosInstance from "../../apiStore/authApi";
import { useParams, Link } from 'react-router-dom';

const ResetPassword: React.FC = () => {

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const params = useParams();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     const regEx =/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
     if(!regEx.test(password)){
        setError('Invalid password sequence !');
        return;
     }
    if (password !== confirmPassword ) {
         setError("Passwords do not match");
         return;
    }
    setSuccess(true);
    setError("");
    const token = params.token;
    axiosInstance({
         method:'POST',
         url:`/resetPassword`,
         data:{
            password,
            token,
        }
     })
     .then((response) =>{
        if(response.data.success){
             setSuccess(true);
        }
     })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {success ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">Password Reset Successful!</h2>
            <p className="mt-4 text-gray-600">You can now log in with your new password.</p>
            <Link to="/login"> Login</Link>
                </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800 text-center">Reset Password</h2>
            <p className="text-gray-600 text-center mt-2">Enter your new password below</p>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
export default ResetPassword;
