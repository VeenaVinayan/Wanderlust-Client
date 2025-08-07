import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AgentFormDataType, FormDataType } from "../../types/formTypes";
import { RootState } from "../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import { otpVerification , resendOtp } from "../../services/Auth/Auth";

const Otp : React.FC = () => {
  
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

    const data =( user === "User") ? userData : agentData;
    setFormData(data);

    try {
      const res = await otpVerification(otpValue, data, user!);
      if (res.success) {
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
    } catch (err: unknown) {
      if(err instanceof Error){
        console.error("OTP verification error:", err.message);
      }
    }
  };

  const handleResend = async () => {
    try {
     const data = await resendOtp(formData!.email);
      if (data.success) {
        toast.success("OTP resent!");
        setOtp(Array(6).fill(""));
        setTimer(60);
        setIsTimerPaused(false);
        setIsResendVisible(false);
      } else {
        toast.error(data.message || "Could not resend OTP.");
      }
    } catch (err: unknown) {
      if(err instanceof Error){
        toast.error(err.message || "Resend failed.");
    }
  };
}

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
