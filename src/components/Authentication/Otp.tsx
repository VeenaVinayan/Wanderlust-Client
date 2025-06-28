
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../apiStore/authApi";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import { AgentFormDataType, FormDataType } from "../../types/formTypes";
// import { RootState } from "../../app/store";
// import { useNavigate , useParams} from "react-router-dom";

// const Otp: React.FC = () => {
//   const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
//   const [timer, setTimer] = useState<number>(60);
//   const [attempts, setAttempts] = useState<number>(0);
//   const [isResendVisible, setIsResendVisible] = useState<boolean>(false);
//   const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false); // New state to handle timer pause
//   const userData: FormDataType = useSelector((state: RootState) => state.register);
//   const [formData, setFormData] = useState<FormDataType | AgentFormDataType>();
//   const agentData : AgentFormDataType = useSelector((state: RootState) => state.agentData);
 
//   const navigate = useNavigate();
//   const { user } = useParams<{ user:string}>();
//    // Handle OTP input change
//   const handleChange = (index: number, value: string) => {
//     if (/^[0-9]*$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//     // Automatically move to the next input field
//       if (value !== "" && index < 5) {
//         const nextInput = document.getElementById(`otp-${index + 1}`);
//         (nextInput as HTMLInputElement)?.focus();
//       }
//     }
//   };
//  // Verify OTP
//   const handleVerify = async () => {
//   const otpValue: string = otp.join("");
//   // Check for empty or invalid OTP inputs
//     if (otp.some((value) => value === "")) {
//       toast.error("Please enter a valid OTP.");
//       setIsResendVisible(true);
//       setIsTimerPaused(true); // Pause the timer on invalid input
//       return;
//     }
//     console.log("Agent Data in otp::",agentData);
//     console.log("user is :: and type : ",typeof user, user);
//     let data;
//     if(user==="User"){
//        setFormData(userData);
//        data = userData;
//        console.log('Inside user ',data);
//     }else{
//       console.log("Agent Data in otp::",agentData);
//        setFormData(agentData);
//        data=agentData;
//        console.log('Inside  Agent before  api call ::: ',data);
//     }
//     try {
//       console.log("Form data is ::",data);
//       const response = await axiosInstance({
//         url: "/otp",
//         method: "post",
//         data: {
//           otp: otpValue,
//           data: data,
//           user,
//         },
//       });
//       if(response.data.success) {
//         toast.success("OTP successfully verified!");
//         navigate("/login"); // Redirect to a success page
//       }else{
//         setAttempts(attempts + 1);
//         console.log(attempts);
//         // Pause the timer on invalid OTP
//         toast.error("Invalid OTP. Please try again.");
//         if (attempts >= 3) {
//            toast.error("You have exceeded the maximum number of attempts.");
//            navigate("/home");
//        }
//       }
//     }catch (err: any) {
//       toast.error(err.response?.data?.message || "An error occurred during verification.");
//     }
//   };
//  // Resend OTP
//   const handleResend = async () => {
//     try {
//         const response = await axiosInstance({
//         url: "/resendOtp",
//         method:"post",
//         data: {
//            email: formData?.email,
//         },
//       });
//       if (response.data.success) {
//         toast.success("OTP resent successfully!");
//         setOtp(Array(6).fill("")); // Clear the current OTP inputs
//         setTimer(60); // Restart the timer
//         setIsTimerPaused(false); // Resume the timer
//         setIsResendVisible(false);
//       } else {
//         toast.error(response.data.message || "Failed to resend OTP.");
//       }
//     }catch(err:any) {
//       toast.error(err.response?.data?.message || "An error occurred while resending OTP.");
//     }
//   };
// //Timer logic
//   useEffect(() => {
//     if (timer > 0 && !isTimerPaused){
//       const interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       },1000);
//       return () => clearInterval(interval);
//     }else if (timer === 0) {
//        setIsResendVisible(true);
//     }
//   },[timer,isTimerPaused,isResendVisible]);
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center mt-4 px-4">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center mb-4 text-gray-600">
//           OTP Verification
//         </h2>
//         <p className="text-center mb-6">
//           We've sent an OTP to your registered mobile number!
//         </p>
//         <div className="flex justify-center gap-2 mb-4">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               value={digit}
//               maxLength={1}
//               onChange={(e) => handleChange(index, e.target.value)}
//               className="w-12 h-12 text-center text-xl font-semibold rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//             />
//           ))}
//         </div>
//         <div className="text-center mb-6">
//           {timer > 0 && (
//             <p className="text-gray-600">
//               Time remaining: <span className="font-semibold">{timer} seconds</span>
//             </p>
//           )}
//           {isResendVisible && (
//             <button
//               onClick={handleResend}
//               className="w-full bg-gray-600 hover:bg-gray-700 text-white py-1 rounded-md font-semibold mt-4"
//             >
//               Resend OTP
//             </button>
//           )}
//         </div>
//         {!isResendVisible && (
//           <button
//             onClick={handleVerify}
//             className="w-full bg-gray-600 hover:bg-gray-700 text-white py-1 rounded-md font-semibold"
//           >
//             Verify
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Otp;

import React, { useEffect, useState } from "react";
import axiosInstance from "../../apiStore/authApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AgentFormDataType, FormDataType } from "../../types/formTypes";
import { RootState } from "../../app/store";
import { useNavigate, useParams } from "react-router-dom";

const Otp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState<number>(60);
  const [attempts, setAttempts] = useState<number>(0);
  const [isResendVisible, setIsResendVisible] = useState<boolean>(false);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.register);
  const agentData = useSelector((state: RootState) => state.agentData);
  const [formData, setFormData] = useState<FormDataType | AgentFormDataType>();

  const navigate = useNavigate();
  const { user } = useParams<{ user: string }>();

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otp.includes("")) {
      toast.error("Please enter a valid OTP.");
      setIsTimerPaused(true);
      setIsResendVisible(true);
      return;
    }

    const data = user === "User" ? userData : agentData;
    setFormData(data);

    try {
      const response = await axiosInstance.post("/otp", { otp: otpValue, data, user });
      if (response.data.success) {
        toast.success("OTP verified!");
        navigate("/login");
      } else {
        setAttempts(attempts + 1);
        toast.error("Invalid OTP. Please try again.");
        if (attempts >= 3) {
          toast.error("Too many attempts. Redirecting...");
          navigate("/home");
        }
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "OTP verification failed.");
    }
  };

  const handleResend = async () => {
    try {
      const response = await axiosInstance.post("/resendOtp", { email: formData?.email });
      if (response.data.success) {
        toast.success("OTP resent!");
        setOtp(Array(6).fill(""));
        setTimer(60);
        setIsTimerPaused(false);
        setIsResendVisible(false);
      } else {
        toast.error(response.data.message || "Could not resend OTP.");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Resend failed.");
    }
  };

  useEffect(() => {
    if (timer > 0 && !isTimerPaused) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsResendVisible(true);
    }
  }, [timer, isTimerPaused]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Verify OTP</h2>
        <p className="text-sm text-gray-500 mb-6">Enter the 6-digit code sent to your email</p>

        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-10 h-12 text-center text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
            />
          ))}
        </div>

        {timer > 0 && !isResendVisible && (
          <p className="text-sm text-gray-500 mb-4">Time left: <span className="font-medium">{timer}s</span></p>
        )}

        {isResendVisible && (
          <button
            onClick={handleResend}
            className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-md text-sm font-medium mb-3"
          >
            Resend OTP
          </button>
        )}

        {!isResendVisible && (
          <button
            onClick={handleVerify}
            className="w-full bg-gray-600 hover:bg-gray-900 text-white py-2 rounded-md text-sm font-medium"
          >
            Verify
          </button>
        )}
      </div>
 </div>
  );
};

export default Otp;
